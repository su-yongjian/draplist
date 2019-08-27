<template>
  <div class="home" id="app">
    <ul class="tab-tilte clearfix">
      <li
        v-for="(tab,index) in tabs"
        :key="tab.type"
        @click="curTab(tab.type,index)"
        :class="index===cuindex?'active':''"
      >{{tab.title}}</li>
    </ul>
    <div class="tab-content">
      <ul class="clearfix flex" v-show="type=='time'">
        <li class="flex-column mar_r-10" v-for="item in list" :key="item.id">
          <img
            class="img"
            :src="item.img?item.img:'https://x.jzbull.com/x/4/img-long.png'"
            :alt="item.name"
          />
          <div class="title-tip padd_t-10">商品名称：{{item.name}}</div>

          <div class="title-tip">所属分类：{{item.cate_name}}</div>
          <div class="title-tip">创建时间：{{item.create_time}}</div>
        </li>
      </ul>
      <div v-show="type=='cate'" v-for="(item,pindex) in clist" :key="item.cate_id">
        <div class="text-c">{{item.cate_name}}</div>
        <ul class="clearfix flex">
          <li
            class="flex-column mar_r-10"
            v-for="(li,idx) in item.list"
            :key="li.id"
            @drop="drop($event,idx,pindex)"
            @dragend="drop_end($event,idx,pindex)"
            @dragover="allow_drop($event)"
          >
            <img
              class="img"
              :src="li.img?li.img:'https://x.jzbull.com/x/4/img-long.png'"
              :alt="li.name"
              draggable="true"
              @dragstart="drag_start($event,idx,pindex)"
            />
            <div class="title-tip padd_t-10">商品名称：{{li.name}}</div>

            <div class="title-tip">所属分类：{{li.cate_name}}</div>
            <div class="title-tip">创建时间：{{li.create_time}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { data } from "./data";
export default {
  name: "home",
  components: {},
  data() {
    return {
      tabs: [
        {
          title: "按分类排序",
          type: "cate"
        },
        {
          title: "按时间倒序",
          type: "time"
        }
      ],
      cuindex: 0,
      type: "cate",
      list: [],
      clist: [],
      drag_index: ""
    };
  },
  created() {
    this.get_data();
  },
  methods: {
    drag_start(e, index) {
      // console.log(index);

      this.drag_index = index;
    },
    drop_end(e, i, pi) {
      e.preventDefault();
    },
    drop(e, i, pi) {
      console.log(e);
      
      let _list = JSON.parse(JSON.stringify(this.clist));
      let tem = _list[pi].list[this.drag_index];
      let tem1 = _list[pi].list[i];

      _list[pi].list[this.drag_index] = tem1;
      _list[pi].list[i] = tem;

      // this.$set(this.clist[pi].list[this.drag_index],'cate_id',tem1)
      // this.$set(this.clist[pi].list[i],'cate_id',tem)

      this.clist = _list;

      // this.$set(this.clist[pi].list,this.drag_index,this.clist[pi].list[i])
      // this.$set(this.clist[pi].list,i,this.clist[pi].list[this.drag_index])
      // this.clist.splice(i+1, 0, this.list[this.dragIndex]);
      // this.clist.splice(this.dragIndex,1)
      event.preventDefault();
    },
    allow_drop(e) {
      e.preventDefault();
    },
    get_data() {
      this.list = data;
      this.to_sort();
    },
    to_sort() {
      if (this.type !== "cate") {
        let newdata = this.list.sort(this.set_sort);
        this.list = newdata;
        return;
      }
      this.classification();
    },
    classification() {
      let result = this.list.reduce((result, item) => {
        let data = item;
        result[item.cate_id]
          ? result[item.cate_id].push(data)
          : (result[item.cate_id] = [data]);

        return result;
      }, Object.create(null));

      let list1 = [];
      for (let k in result) {
        list1.push(result[k]);
      }

      let clist = list1.map((v, i) => {
        return {
          cate_id: v[0].cate_id,
          cate_name: v[0].cate_name,
          list: v
        };
      });
      this.clist = clist;
    },
    curTab(type, index) {
      this.cuindex = index;
      this.type = type;
      this.to_sort();
    },
    set_sort(a, b) {
      if (this.type == "cate") {
        // return a.cate_id - b.cate_id;
      } else {
        return Date.parse(a.create_time) - Date.parse(b.create_time);
      }
    }
  }
};
</script>
<style lang="css" scoped>
.text-c {
  margin-left: 48px;
  font-size: 16px;
  font-weight: bold;
}
.mar_r-10 {
  margin-right: 10px;
}
.padd_t-10 {
  padding-top: 10px;
}
.flex {
  display: flex;
  flex-wrap: wrap;
}
.flex-column {
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 10px;
  cursor: pointer;
}
.img {
  width: 100%;
  min-width: 200px;
  min-height: 100px;
  background-color: #eee;
}
.flex-row {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-lr {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.clearfix:before,
.clearfix:after {
  /*清除浮动，最好最标准的写法*/
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1; /*IE/7/6*/ /*兼容IE6下的写法*/
}
.clr:after {
  display: block;
  clear: both;
  content: " ";
  height: 0;
  overflow: hidden;
}

.tab-tilte li {
  margin: 0;
  padding: 0;
  list-style: none;
}
#app {
  width: 1040px;
  /* height: 800px; */
  margin: 0 auto;
  border: 1px solid #ccc;
}
.tab-tilte {
  width: 90%;
}
.tab-tilte li {
  float: left;
  width: 25%;
  padding: 10px 0;
  text-align: center;
  background-color: #f4f4f4;
  cursor: pointer;
}
li.active {
  background-color: greenyellow;
}
.title-tip {
  font-size: 13px;
  color: #999999;
}
</style>