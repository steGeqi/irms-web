/*
 * @Description: 获取数据
 * @Author:  王瑞
 * @Date: 2022-10-20 00:38:12
 * @LastEditTime: 2022-11-24 18:34:01
 */
import {getList, getdataCount} from '@/api/table'
export const hunhe1 = {
  methods: {
    fetchData() {
      this.listLoading = true
      this.list=null
      if (this.DataName === 'all' || this.DataName.length === 0) {
        this.initname = ['111']
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
        limit: 10
      }
      const numparams = {
        dataName: this.initname,
        dataValue: this.inputValue,
        status: this.tab_name
      }
      getdataCount(numparams).then((response) => {
        this.total = response.data.total
        getList(params).then((response) => {
          response.data.items.forEach(element => {
            element.isEdit = false;
          });

          //数据的空值处理，有需要就用吧
          // for (let i = 0; i < response.data.items.length; i++) {
          //   if (response.data.items[i] == null) {
          //     response.data.items.splice(i,1);
          //   }else{
          //     response.data.items[i]["isEdit"] = false;
          //   }

          // }
          this.list = response.data.items
          //console.log(this.list)
          this.listLoading = false
        })
      })

    }
  }
}
