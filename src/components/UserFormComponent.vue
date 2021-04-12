<template>
    <div>
        <el-form :model="userForm">
                <el-form-item label="Nom" :label-width="formLabelWidth">
                    <el-input
                        type="text"
                        v-model="userForm.name"
                        placeholder="Ex: Asteur"
                        clearable
                    />
                </el-form-item>

                <el-form-item label="FirsName" :label-width="formLabelWidth">
                    <el-input
                        type="text"
                        v-model="userForm.firstName"
                        placeholder="Ex: Florian"
                        clearable
                    />
                </el-form-item>

                <el-form-item label="Age" :label-width="formLabelWidth">
                    <el-input-number
                        v-model="userForm.age"
                        :min="0"
                        :max="120"
                        label="age"
                        controls-position="right"
                    >
                    </el-input-number>
                </el-form-item>
            </el-form>
    </div>
</template>

<script>
import { ref, toRefs, watch, onMounted } from 'vue'

export default {
    props: ['form'],
    emits: ['update:form'],
    setup(props, { emit }) {

        const formLabelWidth = '120px'
        const { form } = toRefs(props)
        const userForm = ref({ name: '', firstName: '', age: 0 })

        onMounted(() => {
            userForm.value = form.value
        })

        watch(form, function (val) {
            userForm.value = val
        })

        watch(userForm, function (val) {
            emit('update:form', val)
        })

        return { 
            userForm,
            formLabelWidth,
        }
    },
}
</script>