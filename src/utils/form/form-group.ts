import { IKeyValue } from '../../models/interfaces/key-value.interface';

export declare interface FormProperties {
    value: any;
    rules: IKeyValue[];
}

export declare type FormControl = {
    [key: string]: FormProperties
}

export class FormGroup {

    public value!: IKeyValue;
    public rules?: IKeyValue;

    constructor(base: FormControl) {
        const keys = Object.keys(base);

        keys.forEach((key: string) => {
            if (!this.value) {
                this.value = {}
                this.value[key] = base[key].value
            } else {
                this.value[key] = base[key].value
            }
            if (!this.rules) {
                this.rules = {}
                this.rules[key] = base[key].rules
            } else {
                this.rules[key] = base[key].rules
            }
        })
    }


    public get refs() {
        return  Object.keys(this)
    }
}