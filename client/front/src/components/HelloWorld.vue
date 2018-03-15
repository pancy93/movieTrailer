<template>
<div class="movieIndex">
    <mu-content-block>
      <mu-row v-for="(row,index) in contentRows" :key="index">
        <mu-col width="100" tablet="50" desktop="25" v-for="(col,index) in row.cols" :key="index">
          <mu-card>
            <mu-card-header :title='col.title' :subTitle='col.original_title'></mu-card-header>
            <mu-card-media>
              <router-link :to='"/detail/"+col.doubanid'>
                <img :src='col.poster' />
              </router-link>
            </mu-card-media>
            <mu-chip v-for="(item,index) in col.genres" :key="index" disabled>
                {{item}}
            </mu-chip>
          </mu-card>
        </mu-col>
      </mu-row>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
    </mu-content-block>
</div>
</template>
<script>

export default {
  data () {
    return {
      maxcount:40,
      count:0,
      scroller: null,
      loading:false,
      contentRows:[
        {
          cols:[]
        }
      ]
    }
  },
  mounted () {
    this.loading=true;
    console.log(this.scroller,this.$el);
    this.scroller=this.$el;
    let that=this;
    let http=new XMLHttpRequest();
    http.onreadystatechange=function(){
      if(http.readyState==4){
        if(http.status==200){
          let res=JSON.parse(http.response);
          if(res.length>0){
            that.contentRows[0].cols=res;
            that.count+=8;
            that.loading=false; 
          }
        }
      }
    };
    http.open('GET','/trailer/index/'+this.count);
    http.send();
    
  },
  methods:{
    loadMore (){
      if(this.count>=this.maxcount){
        return;
      }
      this.loading=true;
      let that=this;
      //ajax获取数据
      let http=new XMLHttpRequest();
      http.onreadystatechange=function(){
        if(http.readyState==4){
          if(http.status==200){
            let res=JSON.parse(http.response);
            that.loading=false;
            that.contentRows.push({cols:res});
            that.count+=8;   
          }
        }
      };
      http.open('GET','/trailer/index/'+this.count);
      http.send();
      }
  }
}
</script>

<style>
.movieIndex img:hover{
  cursor: pointer;
}

.movieIndex img{
  width:100%;
}

.movieIndex{
  width:100%;
  height: 100%;
  overflow-y: scroll;
}
.mu-infinite-scroll{
  margin:30px 0;
}
.movieIndex .mu-chip{
  margin:5px 0 10px 10px;
  height: 20px;
  font-size: 13px;
}

.movieIndex .mu-card-header-title{
  height:70px;
}
.movieIndex::-webkit-scrollbar{
  display:none;
}
</style>