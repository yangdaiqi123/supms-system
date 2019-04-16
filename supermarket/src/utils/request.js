// 引入axios
import axios from 'axios';
// 引入qs
import qs from 'qs'
import local from '@/utils/local'


// 设置服务器根目录
axios.defaults.baseURL='http://172.16.11.208:777';

// axios请求拦截器
axios.interceptors.request.use(config => {
    // 获取token
    const token = local.get('s_t_t_w_h_n666');
    config.headers.authorization = `Bearer ${token}` 
    return config;
})
// 导出请求对象
export default{
    //get方式
    get(url,params={}){
        return new Promise((resolve,reject)=>{
            axios.get(url,{
                params
            })
            .then(response=>{
                resolve(response.data)
            })
            .catch(err=>{
                reject(err)
            })
        })
    },
    // post方式
    post(url,params={}){
        return new Promise((resolve,reject)=>{
            axios.post(url,qs.stringify(params))
            .then(response=>{
                resolve(response.data)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }
}