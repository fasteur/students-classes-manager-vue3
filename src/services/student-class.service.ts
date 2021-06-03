import { AxiosResponse } from 'axios'
import { StudentsClass } from '../models'
import { myAxios } from '../api/axios'

class StudentsClassService {
    
    public getStudentsClassById(id: string): Promise<AxiosResponse<any>> {
        return myAxios.get(`/studentsClass/${id}.json`)
    }

    public addStudentsClass(studentsClass: StudentsClass): Promise<AxiosResponse<any>> {
        return myAxios.post('/studentsClass.json', studentsClass)
    }

    public deleteStudentsClass(studentsClass: StudentsClass): Promise<AxiosResponse<any>> {
        return myAxios.delete(`/studentsClass/${studentsClass.id}.json`)
    }

    public editStudentsClass(studentsClass: StudentsClass): Promise<AxiosResponse<any>> {
        return myAxios.put(`/studentsClass/${studentsClass.id}.json`, {
            name: studentsClass.name,
            students: studentsClass.students,
            teacher: studentsClass.teacher,
        })
    }
}

export const teacherService = new StudentsClassService()
