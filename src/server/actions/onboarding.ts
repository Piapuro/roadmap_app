"use server";

import { createClient } from "@/server/lib/supabase-server";
import { SKILL_TAGS, type SkillLevel } from "@/types/onboarding";

export async function saveOnboardingSkills(
  skillLevel: SkillLevel,
  skillIds: string[]
) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("ユーザー情報の取得に失敗しました");

  const { error: updateError } = await supabase
    .from("users")
    .update({ skill_level: skillLevel })
    .eq("id", user.id);
  if (updateError) throw new Error("スキルレベルの保存に失敗しました");

  // 入力された skillId がすべて SKILL_TAGS に存在するか検証
  const matchedTags = SKILL_TAGS.filter((t) => skillIds.includes(t.id));
  if (matchedTags.length !== skillIds.length) {
    throw new Error("無効なスキルIDが含まれています");
  }

  // 既存スキルを取得して差分同期（選択解除されたものを削除）
  const { data: existingSkills, error: fetchError } = await supabase
    .from("user_skills")
    .select("skill_name")
    .eq("user_id", user.id);
  if (fetchError) throw new Error("既存スキルの取得に失敗しました");

  const selectedSkillNames = matchedTags.map((t) => t.name);
  const existingNames = (existingSkills ?? []).map(
    (s: { skill_name: string }) => s.skill_name
  );
  const toDeleteNames = existingNames.filter(
    (name: string) => !selectedSkillNames.includes(name)
  );

  if (toDeleteNames.length > 0) {
    const { error: deleteError } = await supabase
      .from("user_skills")
      .delete()
      .eq("user_id", user.id)
      .in("skill_name", toDeleteNames);
    if (deleteError) throw new Error("スキルタグの削除に失敗しました");
  }

  if (matchedTags.length > 0) {
    const skillRows = matchedTags.map((t) => ({
      user_id: user.id,
      skill_name: t.name,
      is_learning_goal: false,
    }));
    // upsert で冪等性を確保（再訪問時の重複 INSERT を防ぐ）
    const { error: skillsError } = await supabase
      .from("user_skills")
      .upsert(skillRows, { onConflict: "user_id,skill_name" });
    if (skillsError) throw new Error("スキルタグの保存に失敗しました");
  }
}
