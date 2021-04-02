<template>
    <div>
        <h3>{{ $t(title) }}</h3>
        <form @submit.prevent="submitForm()">

            <div>
                <div class="r-space-around">
                    <div>
                        <input
                            type="text"
                            v-model="form.name"
                            placeholder="Ex: Florian"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            v-model.number="form.age"
                            placeholder="Ex: 28"
                        />
                    </div>
                    <div>
                        <button
                            :class="{ active: formIsValid, disabled: !formIsValid }"
                            type="submit"
                        >
                            {{ $t('GENERAL.SUBMIT') }}
                        </button>
                        <button type="button" @click="resetForm()">
                            {{ $t('GENERAL.RESET') }}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { computed, ref, watch, toRefs } from 'vue'

export default {
    props: ['title', 'user'],
    emits: ['formChange', 'resetFormChange'],
    setup(props, { emit }) {
        const { user } = toRefs(props)

        const form = ref({
            name: '',
            age: null,
        })

        watch(user, function (val) {
            form.value = {
                name: val.name,
                age: val.age,
            }
        })

        function formChange() {
            const formValue = {
                ...props.user,
                ...form.value,
            }
            formValue.name.toString().trim()
            emit('formChange', formValue)
        }

        function resetForm() {
            form.value = {
                name: '', 
                age: null
            }
            emit('resetFormChange')
        }
        
        const errors = computed(() => {
            const errors = []

            if (!form.value.name) {
                errors.push('Name field is required!')
            }
            if (!form.value.age) {
                errors.push('Age is required!')
            }
            if (typeof form.value.age !== 'number') {
                errors.push('Age is a number!')
            }
            return errors
        })

        const formIsValid = computed(() => !(errors.value.length > 0))

        function submitForm() {
            if (formIsValid.value) {
                formChange()
                resetForm()
            }
        }

        return {
            submitForm,
            formIsValid,
            form,
            resetForm
        }
    },
}
</script>
