<template>
    <div class="container__wrapper">
        <el-form
            :model="userForm"
            :rules="rules"
            label-position="left"
            label-width="120px"
            class="container__inner"
        >
            <el-form-item prop="email" :label="labels.email">
                <el-input v-model="userForm.email"></el-input>
            </el-form-item>

            <el-form-item :label="labels.password" prop="password">
                <el-input
                    type="text"
                    :show-password="true"
                    v-model="userForm.password"
                    placeholder="Ex: 65fddfyyhb$"
                    clearable
                />
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { ref, toRefs, watch, onMounted, computed, defineComponent, PropType, inject } from 'vue'
import { validators } from '@/utils/form/validator-rules'
import { FormGroup } from '@/utils/form/form-group'
import { Path, TranslateResult } from 'vue-i18n';

declare type LoginFormPropeties = { 
    password: string,
    email: string,
}

export default defineComponent({
    props: {
        form: {
            type: Object as PropType<LoginFormPropeties>,
            default: null,
        }
    },
    emits: ['update:form'],
    setup(props, { emit }) {
        // Inject
        const translate =  inject<(key: Path) => TranslateResult>('i18nTranslate')

        // Props
        const { form } = toRefs(props)

        // Datas
        const formLabelWidth = '20'
        const formGroup = new FormGroup({ 
            password: {
                value: '',
                rules: [validators.required()],
            },
            email: {
                value: '',
                rules: [validators.required(), validators.email()],
            },
        });
        const userForm = ref(formGroup.value);
        const rules = ref(formGroup.rules);

        // LifeCycle Hooks
        onMounted(() => {
            userForm.value = form.value
        })

        // Watchers
        watch(form, function (val: LoginFormPropeties) {
            userForm.value = val
        })

        watch(userForm, function (val) {
            emit('update:form', val)
        })

        // Computed Properties
        const labels = computed(() => {
            return {
                password: translate!('REGISTER_FORM.COLUMNS.PASSWORD'),
                email: translate!('REGISTER_FORM.COLUMNS.EMAIL'),
            }
        })

        return { 
            userForm,
            formLabelWidth,
            rules,
            labels,
        }
    },
})
</script>

<style lang="scss">
@import '@/assets/style.scss';

.el-form {
    width: 460px;
}
</style>