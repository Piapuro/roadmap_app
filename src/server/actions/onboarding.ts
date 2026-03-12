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

  if (skillIds.length > 0) {
    const skillRows = SKILL_TAGS.filter((t) => skillIds.includes(t.id)).map((t) => ({
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
