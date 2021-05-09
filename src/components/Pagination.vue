<template>
  <div class="pagination">
      <button >«</button>
      <button class="pagebtn pageEllipsis" v-if="isPrevHidden">...</button>
      <button 
        :class="[{currentPage:btn===currentPage},{pageEllipsis:btn==='...'},'pagebtn']"
        @click="changePage(btn)"
      v-for="(btn,index) in pagebtns" :key='index'>
          {{btn}}
      </button>
      <button>»</button>

  </div>
</template>

<script>
import $ from 'jquery'
export default {
    name:'Pagination',
    data(){
        return{
            pagebtns:[1,2,3,4,5,'...'],
            currentPage: 1,
            isPrevHidden:false
        }
    },
    methods:{
        changePage(page){
            //点击上一页/下一页/首页
            if(typeof page !== 'number'){
                switch(page.target.innerText){
                    case '上一页':
                        $('button.currentPage').prev().click()
                        break;
                    case '下一页':
                        $('button.currentPage').next().click()
                        break;
                    case '首页':
                        this.pagebtns = [1,2,3,4,5,'......']
                        this.changePage(1)
                        break
                    default:
                        break
                }
                return
            }
            this.isPrevHidden= page>4?true:false
            this.currentPage = page
            if(page===this.pagebtns[4]){
                this.pagebtns.shift()
                this.pagebtns.splice(4,0,this.pagebtns[3]+1)
            }
            else if(page === this.pagebtns[0] && page!==1){
                this.pagebtns.unshift(this.pagebtns[0]-1)
                this.pagebtns.splice(5,1)
            }
            this.$emit('handle',this.currentPage)
        }
    }
}
</script>

<style lang='scss' scoped>
button{
    padding: 4px 12px;
    background: white;
    border: 1px solid #dddddd;
    border-right: none;
    color: #778087;
    cursor: pointer;
    &:first-child{
        border-radius: 3px 0 0 3px;
    }
    &:last-child{
        border-right: 1px solid #dddddd;
        border-radius: 0 3px 3px 0;
    }
}
.currentPage{
    color:#80bd84;
    cursor: default;
}
.pageEllipsis{
    cursor: default;
}
</style>