<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'

// ===== 日付フォーマッターの設定 =====
// 日本語ロケールで長い日付形式（例：2024年1月15日）で表示するためのフォーマッター
const df = new DateFormatter('ja-JP', { dateStyle: 'long' })

// ===== リアクティブな状態管理 =====
// カレンダーで選択された日付を管理するリアクティブな変数
// shallowRefを使用することで、オブジェクトの深い変更は監視せず、参照の変更のみを監視
const selectedDate = shallowRef<CalendarDate | undefined>(undefined)

// ===== バリデーションスキーマの定義 =====
// Valibotを使用してフォームのバリデーションルールを定義
const schema = v.object({
  selectedDate: v.undefinedable(v.pipe(
    v.string(), // 文字列であることを確認
    v.isoDate() // ISO日付形式（YYYY-MM-DD）であることを確認
  )),
})

// スキーマから型を推論してTypeScriptの型として使用
type Schema = v.InferOutput<typeof schema>

// ===== フォームの状態管理 =====
// フォームの入力値を管理するリアクティブなオブジェクト
const state = reactive<Schema>({
  selectedDate: undefined, // 初期値は未選択状態
})

// ===== ウォッチャーの設定 =====
// selectedDateが変更されたときに、フォームの状態も同期して更新
watch(selectedDate, (newVal) => state.selectedDate = newVal?.toString())

// ===== トースト通知の設定 =====
// フォーム送信時の成功メッセージを表示するためのトースト機能
const toast = useToast()

// ===== フォーム送信処理 =====
// トーストでreactiveの値を表示
async function onSubmit(event: FormSubmitEvent<v.InferOutput<typeof schema>>) {
  console.log(event.data)

  toast.add({
    title: `選択された日付: ${event.data.selectedDate || 'undefined'}`,
    description: 'reactive内の値です',
    color: 'info'
  })
}
</script>

<template>
  <UApp>
    <UForm
      :state="state"
      :schema="schema"
      @submit="onSubmit"
    >
      <!-- ===== 日付選択フィールド ===== -->
      <UFormField
        label="日付選択"
        name="selectedDate"
      >
        <!-- ===== ポップオーバー（カレンダー表示用） ===== -->
        <UPopover>
          <!-- ===== 日付選択ボタン ===== -->
          <UButton
            color="neutral"
            variant="subtle"
            icon="i-lucide-calendar"
            class="justify-start font-normal"
          >
            {{ selectedDate ? df.format(selectedDate.toDate(getLocalTimeZone())) : '日付を選択' }}
          </UButton>

          <!-- ===== ポップオーバーの内容（カレンダー） ===== -->
          <template #content>
            <UCalendar v-model="selectedDate" />
          </template>
        </UPopover>
      </UFormField>

      <!-- ===== 送信ボタン ===== -->
      <UButton type="submit" color="primary">
        送信
      </UButton>
    </UForm>
  </UApp>
</template>
