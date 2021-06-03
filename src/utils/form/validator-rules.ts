import { IKeyValue } from '../../models/interfaces/key-value.interface'
import i18n from '@/i18n'

class ValidatorRules {
    private translate = i18n.global.t

    public email(message?: string): IKeyValue {
        return {
            type: 'email',
            message: message ? message : this.translate('VALIDATOR.EMAIL'),
            trigger: ['blur', 'change'],
        }
    }

    public required(message?: string): IKeyValue {
        return {
            required: true,
            message: message ? message : this.translate('VALIDATOR.REQUIRED'),
            trigger: 'blur',
        }
    }
}

export const validators = new ValidatorRules()
