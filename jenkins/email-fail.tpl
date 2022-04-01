<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${ENV, var="JOB_NAME"}-第${BUILD_NUMBER}次构建日志</title>  
<style>
    html,body{
        font-family: "SF Pro SC","SF Pro Text","SF Pro Icons","PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif;
    }
    .table.success{
        border: 1px solid #ddd;
        color: #4A4A4A;
    }

    .table.success td{
        font-size: 16px;
        overflow: hidden;
        word-break: break-all;
    }
    

    td.info{
        background-color: #DFB051;
        height: 44px;
        color: #fff;
    }

    td:first-child{
        padding-left:  49px;
        padding-right:  49px;
    }

    td.build-status{
        background-color: #D54D53;
        height: 44px;
        color: #fff;
    }

    .table.success td pre{
       white-space: pre-wrap;
    }

    .success-ico{
        vertical-align: middle;
        margin-left: 10px;
        width: 25px;
        /* height: 30px; */
        /* margin-bottom: 20px; */
    }

    

    td.info-title{
        color: #D54D53;
        height: 36px;
        font-weight: bold;
        font-size: 16px;
    }

    .table.success ul{
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .table.success ul li{
        list-style: none;
    }

    /* ul{
       
    } */

    ul li{
        height: auto; 
        line-height: 35px;
        font-size: 14px;
        white-space: normal;
        
    }

    hr{
        margin-left: 0;
    }

</style>
</head>
 
<body leftmargin="8" marginwidth="0" topmargin="8" marginheight="4"
    offset="0">

    
    <table width="95%" cellpadding="0" cellspacing="0" class="table success">
        <tr>
            <td class="info">(大佬们好呀，本邮件是jenkins自动下发的，请勿回复！)</td>
        </tr>
    </table>   

    <br/>

    <table width="95%" cellpadding="0" cellspacing="0" class="table success">
       
        <tr>
            <td class="build-status">
                构建失败啦！！！
                <img class="success-ico" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAFp3oPPAAAAAXNSR0IArs4c6QAABOFJREFUWAmll1uIVVUYx88ZzehiZtrFIauxixmV5UOG1FtC9dhLZA+Oig85mVlRvoTYQ1QD9VCQGAhBCAoZFdmFRMwaLHUMuhiGdx0KpbwUpaan33+d/a2z1tr77LNHF/zm+77/96119l577bX21GpZazQav5rvLEK3Cfjza/z5HWbCo5bIWZI/W/cFchB2+iqCyfCeVVxqGcSbTdxsYrGldFwugzg2FdF2OQ1nqhys2hVW2Awbz2K7lVxnCbNoH5nvLeKQDzo5FK+FvdC8v7AD4sEwlo/mr0/BAjiRFmWFs5yuHtAFjbDQYuwNXid4Fz71QuagNR9bmghjddY1/RCK8tFOploupqieFe+JkiS2mYA/DvoszlmST8EvMD5NonXDDpid5nxM8oAPKjr02R2VIgyagH8KzlicWnL9oHaLclh3/yNx3q/X69OCDivwLw7i1L0O4Qx93BuF7WGM1RoxuiXirrQn2rfgriDNKSa3S3/uhDFFBalG3asFmh7ATU7Hea7KYNSk63YsUm86uK7uEFySSyQCNeNhXyIXhxTeAWtgCHbDhzC5uLpEpdNiGIA/4Ct4oaS8laLwAvgN5rTUlof+JOjW3fvTymQeiXvgs1yiQKDuS7g1SiHosb0RiR0C6t8Et1fZYttKn9GI/R36hmntG/7AWEZnNxj2AVBbGFabj16HY/CTNOwoWCTndFB0ktg100JLYmWW9guQ+KwGeckK8cfAdrjKtNCi65fPwsum4782kmCTCdhTsAZWkRyN1Y63hDf4OLaGVd7mUZLaoK7k4abfvEfzzZK/Hw5ZnFpyj2jUuy2R/ZKFzqLpSidSrCssavdFE1tUYRqDfGB+aNHdxL6Ik95nWOd8aqZDtNyJtWM+bwXxhpwbws3XNXSITgniw76UYAL4R+0TJQ71yyFeCgjTYG1JP5+iTi9guOn7nCZZ93gY5rXUloc+B4ZgREst8ShcCpvhOOgEeKZdeTTb7YoYQOeTXsr50APfwXrQp4wm9wjoBLkedF7dCzPgR1gFb7He/saeW+MCrgZtr/thLlSbiuTn6Kep1s56BDbBlUlJ+5Diu+AEvAId13P7kfIZxtOFvQN/wtR8RaZkhVuxOrEmQe4TuG3nYSay39qI/QLiG0bQFqlV22vj4j8Eekzag1dA86vACoZh6avN/kH4BP6DdTAF9HWsZXChH45gJ8z1Quag6bswbHojRqV17WJqtdbCpj1/elhP/AS446wLZxnJPaz2lWFR5rtjK9C/L9qZg3zq6gwJm97eyyKhXn+b+F+uo08byxYo3FTCTufjM/7loO2hsJFbCBt1Mt4Ouf8i1IuC1ZiZsAU0S9pXjoHOaO27N4LyE2A5LGXmjmKjVqRFBbXaDuIp+sFB6E2Sww4ZQ4tUC/0AaOOr3Kh/GjboYpY4p3LX8kLG0r/bp8F/AZT3cE/ga+r9Oau7mdWpU9U8Yy2CgSr11Gm9bPe1BPq61D7zuBfPw2GcHlBru2g1PPk+yP/vgahvvwH4GCodoO2ul/4Xgc6iwl0cXcfC5/ANxDtwOCjJGfAX9JcWhp0q+ow3Al6Ho3BbxW5uCq+lwzbQNM6Gc5ot+mkW5sFBWA/R9114QZV+gAH0rbIYHoNJsAG09+yD/aAvdH0aiImgvUfb/l7Q/qPvmX+wpe1/hOxf2WFwkocAAAAASUVORK5CYII=" />
            </td>
        </tr>
        <tr>
            <td class="info-title">构建信息
                     <!-- <hr size="2" width="100%" align="center" /> -->
            </td>
        </tr>
        <tr>
            <td>
                <ul>
                    <li>项目名称 ： ${JOB_NAME}</li>
                    <li>构建编号 ： 第${BUILD_NUMBER}次构建</li>
                    <li>触发原因 ： ${CAUSE}</li>
                    <li>构建日志 ： <a href="${BUILD_URL}console">${BUILD_URL}console</a></li>
                    <li>工作目录 ： <a href="${PROJECT_URL}">${PROJECT_URL}</a></li>
                </ul>
                <hr size="2" width="100%" />
            </td>
        </tr>

        <tr>
            <td class="info-title">历史变更记录</td>
        </tr>
        <tr>
            <td>
                <ul>
                    <li>
                        ${CHANGES,format="更新作者： [%a]",showPaths=true,pathFormat="&nbsp;&nbsp;&nbsp;&nbsp;%p"}     
                    </li>
                    <li>
                        ${CHANGES,format="更新信息： %m",showPaths=true,pathFormat="&nbsp;&nbsp;&nbsp;&nbsp;%p"}
                    </li>
                </ul>
                <!-- ${CHANGES_SINCE_LAST_SUCCESS,reverse=true, format="Changes for Build #%n:<br />%c<br />",showPaths=true,changesFormat="<pre>[%a]<br />%m</pre>",pathFormat="&nbsp;&nbsp;&nbsp;&nbsp;%p"} -->

                <hr size="2" width="100%" />
            </td>
        </tr>
        <tr>
            <td class="info-title">构建日志(最后100行)</td>
        </tr>
        <tr>
            <td><p><pre>${BUILD_LOG, maxLines=100}</pre></p></td>
            <!-- <td><p><pre>a3a087ad7fc4d157d6e9ea15b16b70ca2bd17570a2b41b4dec552eab8ca6ee97 -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e ******** -e</pre></p></td> -->
        </tr>
    </table>
</body>
</html>