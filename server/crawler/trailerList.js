/**
 * 爬虫脚本，获取豆瓣电影页面中的信息
 */

const http=require('http');
const syncRequest=require('sync-request');
const puppeteer=require('puppeteer');

let url='https://movie.douban.com/tag/#/?sort=R&range=0,10&tags=';

(async()=>{
    const browser=await puppeteer.launch();
    const page=await browser.newPage();
    await page.goto(url);
    //加载更多（一次）
    await page.waitForSelector('.more');
    await page.click('.more');
    await (new Promise(resolve=>{
        setTimeout(resolve,3000);
    }));
    let list=await page.evaluate(() => {
        //获取网页中所需的信息
        var listwp=document.getElementsByClassName('list-wp')[0];
        var items=listwp.children;
        var links=[];

        if(items.length>=1){
            for(var i=0;i<items.length;i++){
                var cover=items[i].getElementsByClassName('cover-wp')[0];
                var doubanid=cover.dataset.id;
                var title=items[i].getElementsByClassName("title")[0].innerText;
                var rate=items[i].getElementsByClassName("rate")[0].innerText;
                rate=Number(rate);
                var poster=cover.getElementsByTagName('img')[0].src.replace('s_ratio','l_ratio');

                links.push({
                    doubanid:doubanid,
                    title:title,
                    rate:rate,
                    poster:poster,
                });
            }
        }

        return links;
    });

    console.log('1.list:',list);

    for(let j=0;j<list.length;j++){
        await page.goto('https://movie.douban.com/subject/'+list[j].doubanid);
        await (new Promise(resolve=>{
            setTimeout(resolve,1000);
        }));
        let detail=await page.evaluate(()=>{
            var result={};
            var trailercontent=document.getElementsByClassName('related-pic-video')[0];
            if(trailercontent){
                result.trailerpic=trailercontent.getElementsByTagName('img')[0].src;
                result.trailerpage=trailercontent.href;
            }
            return result;
        });
        list[j].trailerpic=detail.trailerpic||'';
        list[j].trailerpage=detail.trailerpage||'';
    }

    console.log('2.list:',list);

    for(let k=0;k<list.length;k++){
        if(!list[k].trailerpage){
            list[k].trailervideo='';
            continue;
        }
        await page.goto(list[k].trailerpage);
        await (new Promise(resolve=>{
            setTimeout(resolve,1000);
        }));
        let videourl=await page.evaluate(()=>{
            var video=document.getElementsByTagName('video')[0];
            if(video){
                return video.childNodes[1].src;
            }
        });
        list[k].trailervideo=videourl||'';
    }
    
    console.log('3.list:',list);

    //api获取更详细的文本信息
    // for(let l=0;l<list.length;l++){
    //     let ar=list[l];
    //     //循环中需要使用同步操作
    //     let res=syncRequest('GET','http://api.douban.com/v2/movie/subject/'+ar.doubanid);
    //     let apir=JSON.parse(res.getBody());
    //     ar=Object.assign(ar,apir);
    // }

    console.log('final:',list.length);
    process.send(list);
    await browser.close();
})();