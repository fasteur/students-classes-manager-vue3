import { Student } from './student.model';
import { Teacher } from './teacher.model';

export class StudentsClass {
    public id!: string;
    public name!: string;
    public students!:  Student[];
    public teacher!: Teacher;

    constructor(base: Partial<StudentsClass>) {
        Object.assign(this, base);
    }
}