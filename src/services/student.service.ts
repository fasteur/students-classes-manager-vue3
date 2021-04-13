import { AxiosResponse } from 'axios'
import { Student } from '../models'
import { myAxios } from '../api/axios'

class StudentService {
    public getStudents(): Promise<AxiosResponse<any>> {
        return myAxios.get('/students.json')
    }

    public addStudent(student: Student): Promise<AxiosResponse<any>> {
        return myAxios.post('/students.json', student)
    }

    public deleteStudent(student: Student): Promise<AxiosResponse<any>> {
        return myAxios.delete(`/students/${student.id}.json`)
    }

    public editStudent(student: Student): Promise<AxiosResponse<any>> {
        return myAxios.put(`/students/${student.id}.json`, {
            name: student.name,
            age: student.age,
            firstName: student.firstName,
        })
    }
}

export const studentService = new StudentService()
