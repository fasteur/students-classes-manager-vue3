import { AxiosResponse } from 'axios'
import { Teacher } from '../models'
import { myAxios } from '../api/axios'

class TeacherService {
    public getTeachers(): Promise<AxiosResponse<any>> {
        return myAxios.get('/teachers.json')
    }

    public addTeacher(teacher: Teacher): Promise<AxiosResponse<any>> {
        return myAxios.post('/teachers.json', teacher)
    }

    public deleteTeacher(teacher: Teacher): Promise<AxiosResponse<any>> {
        return myAxios.delete(`/teachers/${teacher.id}.json`)
    }

    public editTeacher(teacher: Teacher): Promise<AxiosResponse<any>> {
        return myAxios.put(`/teachers/${teacher.id}.json`, {
            name: teacher.name,
            classes: teacher.classes,
        })
    }
}

export const teacherService = new TeacherService()
