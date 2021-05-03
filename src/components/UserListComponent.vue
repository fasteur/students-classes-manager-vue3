<template>
    <div class="user-list__container">
        <h3 class="float-left">{{ title }}</h3>
        <el-table :data="userList" style="width: 100%">
            <el-table-column :label="state.table.labelName" prop="name"></el-table-column>
            <el-table-column :label="state.table.labelFirstName" prop="firstName"></el-table-column>
            <el-table-column :label="state.table.labelAge" prop="age"></el-table-column>
            <el-table-column align="right">
                <template #header></template>
                <template #default="scope">
                    <el-button
                        @click="editUserChanges(scope.row)"
                        type="primary"
                        icon="el-icon-edit"
                        circle
                    ></el-button>
                    <el-button
                        @click="deleteUserChanges(scope.row)"
                        type="danger"
                        icon="el-icon-delete"
                        circle
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core'
import { inject, reactive } from 'vue'
import { Path, TranslateResult } from 'vue-i18n'
import { User } from '../models'

interface UserListComponentDataState {
    table: {
        labelName: string
        labelFirstName: string
        labelAge: string
    }
}
export default defineComponent({
    props: ['title', 'userList'],
    emits: ['editUserChanges', 'deleteUserChanges'],
    setup(_, { emit }) {
        // Table properties
        const state: UserListComponentDataState = reactive({
            table: {
                labelName: computed(() => translate!('USER_LIST.COLUMNS.NAME')),
                labelFirstName: computed(() => translate!('USER_LIST.COLUMNS.FIRST_NAME')),
                labelAge: computed(() => translate!('USER_LIST.COLUMNS.AGE')),
            }
        })

        const translate =  inject<(key: Path) => TranslateResult>('i18nTranslate')

        // Emits: actions on user field
        const editUserChanges = (user: User): void => emit('editUserChanges', user)
        const deleteUserChanges = (user: User): void => emit('deleteUserChanges', user)

        return {
            editUserChanges,
            deleteUserChanges,
            state
        }
    },
})
</script>

<style lang="scss">
@import '@/assets/style.scss';

.user-list {
    &__container {
        margin: l('spacing');
    }
}
</style>
