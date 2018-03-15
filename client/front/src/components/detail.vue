<template>
  <div class="container">
      <div>
      <router-link to="/"><mu-icon value="backspace" :size="36"/></router-link>
      </div>
        <mu-card>
            <mu-card-media :title="'豆瓣评分：'+detail.rate+'('+detail.ratings_count+')'">
                <img :src='detail.poster' class="poster"/>
            </mu-card-media>
            <mu-card-title :title="detail.title" :subTitle="detail.original_title"/>
            <mu-breadcrumb class="casts">
                导演：
                <mu-breadcrumb-item v-for="di in detail.directors" :key="di.id">
                    {{di.name}}
                </mu-breadcrumb-item>
            </mu-breadcrumb>
            <mu-breadcrumb class="casts">
                主要演员：
                <mu-breadcrumb-item v-for="di in detail.casts" :key="di.id">
                    {{di.name}}
                </mu-breadcrumb-item>
            </mu-breadcrumb>
            <mu-card-title :subTitle="detail.year+'('+detail.countries[0]+')'"/>
            <mu-chip v-for="(item,index) in detail.genres" :key="index" disabled>
                {{item}}
            </mu-chip>
            <mu-raised-button label="播放预告片" secondary @click="playTrailer"/>
            <mu-card-text>
                {{detail.summary}}
            </mu-card-text>
        </mu-card>
        <mu-dialog :open="trailerPlaying" @close="close">
            <div id="dplayer"></div>
            <mu-flat-button slot="actions" primary @click="close" label="退出"/>
        </mu-dialog>
  </div>
</template>

<script>
import 'DPlayer/dist/DPlayer.min.css';
import DPlayer from 'DPlayer';
import { setTimeout } from 'timers';
export default {
  data(){
      return{
          detail:null,
          trailerPlaying:false
      }
  },
  props:['id'],
  mounted(){
      let that=this;
      let http=new XMLHttpRequest();
      http.onreadystatechange=function(){
          if(http.readyState==4&&http.status==200){
              let res=JSON.parse(http.response)
              console.log(res);
              that.detail=res[0];
          }
      }
      http.open('GET','/trailer/detail/'+this.id);
      http.send();
    
  },
  methods:{
      playTrailer(){
          //初始化播放器
          this.trailerPlaying=true;
          const that=this;
          setTimeout(function(){
              //console.log(that.detail);
              let dp=new DPlayer({
                  container:document.getElementById('dplayer'),
                  video:{
                      url:that.detail.trailervideo,
                      pic:that.detail.trailerpic
                  }
              });
          },500);
          
          //console.log(DPlayer);
      },
      close(){
          this.trailerPlaying=false;
      }
  }
}
</script>

<style>

.container{
    height: 100%;
    overflow-y: scroll;
}

.container::-webkit-scrollbar{
  display:none;
}

.mu-card-media{
    float: right;
    margin: 10px;
}

.mu-chip{
    margin:0 10px;
}

.mu-card{
    overflow: hidden;
}

.mu-card-text{
    margin-right: 250px;
}
.container .poster{
    width:250px;
}

.container .casts{
    margin-left:15px;
}
</style>
