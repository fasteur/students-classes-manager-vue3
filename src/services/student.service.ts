import { AxiosResponse } from 'axios'
import { User } from '../models'
import { myAxios } from '../api/axios'

class StudentService {
    public getUsers(): Promise<AxiosResponse<any>> {
        return myAxios.get('/students.json')
    }

    public addUser(user: User): Promise<AxiosResponse<any>> {
        return myAxios.post('/students.json', user)
    }

    public deleteUser(user: User): Promise<AxiosResponse<any>> {
        return myAxios.delete(`/students/${user.id}.json`)
    }

    public editUser(user: User): Promise<AxiosResponse<any>> {
        return myAxios.put(`/students/${user.id}.json`, {
            name: user.name,
            age: user.age,
        })
    }
}

export const studentService = new StudentService()
