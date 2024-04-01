/*
 * @Description: 获取数据
 * @Author:  王瑞
 * @Date: 2022-10-20 00:38:12
 * @LastEditTime: 2022-11-04 17:55:33
 */
import {getdataCount, getNetWorkList} from '@/api/IP_address'
import { getList } from '@/api/table'
export const hunhe1 = {
  methods: {
    fetchData() {
      this.listLoading = true
      if (this.DataName === 'all' || this.DataName.length === 0) {
        //console.log(this.DataName)
        this.initname = ['']
      } else {
        this.initname = JSON.parse(JSON.stringify(this.DataName))
      }
      //console.log(this.tab_name)
      const params = {
        dataName: this.initname,
        dataValue: this.inputValue,
        status: this.tab_name,
        start: this.start,
        limit: this.limit
      }
      const NetWork_params = {
        dataName: this.initname,
        dataValue: this.inputValue,
        status: this.tab_name,
        start: this.start,
        qinfo_input:'.',
        limit: this.limit
      }
      getdataCount(NetWork_params).then((response) => {
        this.total_N = response.data.total
        //console.log(this.total_N)
        this.listLoading = false
      })
      getList(params).then((response) => {

        response.data.items.forEach(element => {
          element.isEdit = false;
        });
        this.list = response.data.items
        //console.log(this.list)
        this.listLoading = false
      })
      getNetWorkList(NetWork_params).then((response) => {

        response.data.items.forEach(element => {
          element.isEdit = false;
        });
       let list_n = response.data.items



        // // 数据类型转换
        let arr=[]
        //console.log(this.total_N)
        for(let i=0;i<list_n.length;i++){
          if(list_n[i][0]==null){
            list_n[i][0]=list_n[i-1][0]
          }
          list_n[i][0]["isEdit"]=false
         let tryss = Object.assign(list_n[i][0],list_n[i][1])
          arr.push(tryss)
        }
        //console.log(arr)
        this.list_network = arr

        this.listLoading = false

      })
    }
  }
}
