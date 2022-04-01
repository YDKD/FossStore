<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>${ENV, var="JOB_NAME"}-第${BUILD_NUMBER}次构建日志</title>
        <style>
            html,
            body {
                font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
            }
            .table.success {
                border: 1px solid #ddd;
                color: #4a4a4a;
            }

            .table.success td {
                font-size: 16px;
                overflow: hidden;
                word-break: break-all;
            }

            td.info {
                background-color: #dfb051;
                height: 44px;
                color: #fff;
            }

            td:first-child {
                padding-left: 49px;
                padding-right: 49px;
            }

            td.build-status {
                background-color: #76ac35;
                height: 44px;
                color: #fff;
            }

            .table.success td pre {
                white-space: pre-wrap;
            }

            .success-ico {
                vertical-align: middle;
                margin-left: 10px;
                width: 25px;
                /* height: 30px; */
                /* margin-bottom: 20px; */
            }

            td.info-title {
                color: #76ac35;
                height: 36px;
                font-weight: bold;
                font-size: 16px;
            }

            .table.success ul {
                list-style: none;
                margin: 0;
                padding: 0;
            }
            .table.success ul li {
                list-style: none;
            }


            ul li {
               height: auto; 
               line-height: 35px;
               font-size: 14px;
               white-space: normal;
            }

            hr {
                margin-left: 0;
            }
        </style>
    </head>

    <body leftmargin="8" marginwidth="0" topmargin="8" marginheight="4" offset="0">
        <table width="95%" cellpadding="0" cellspacing="0" class="table success">
            <tr>
                <td class="info">(大佬们好呀，本邮件是jenkins自动下发的，请勿回复！)</td>
            </tr>
        </table>

        <br />

        <table width="95%" cellpadding="0" cellspacing="0" class="table success">
            <tr>
                <td class="build-status">
                    构建成功啦
                    <img
                        class="success-ico"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAFp3oPPAAAAAXNSR0IArs4c6QAAA/ZJREFUWAm9mLtPVEEUxlkDAaKhQY1iKyWPAmNhYazUAmOMrZRYGQtii9FWwI4e/wA1JibamKixQChITEisqFgNaGI0FDasv2/unNm5r727sDLJt+f1nTNz53VvtqfHt0ajUTe9ZookgdeIN1ICwwiOSaBhDuRHp+O7JwX5wTm8MY7jlXOg9IO5EC1UYLgWglgDwTAFZ7/pJvFtOx1lInKOR/od6cQH9eOGhSxsliSiK4tcMGYIZhUIr0AdhG4DB2cywOBxY2k+CASbQy2Ba/jcjCETIoqbD6R7GrHQQ3fo4emTEgW/kOq9PjNey0Ct0TDWVdqtJzLXAjtWItaC/Njpp8YRdgj6AHBPHRcJuoJKEDE4vYJv0MdaFkh3n61SYFM0naNeYh62a7FPepEfX5KLkhyEbFYHtmrU+KmzPCPWYwf5PX5dNdL6MRKvo9jELnZQyHF97jWXh6GVcpsU2Quqmu1AXQv5FcS5DZrHo2R44ohbEk67IU4AO6Q6qNKrT0y6jFvqeRLXwV8v57OcQhtyH9gBN4oI8vt4X1FcSzcFVgqDGad44qfcOEbAg5SzwhBfeYGGsWkG+gnwzexYyq+4+dCTPJRH5pSUDdRGM/7RxJ3nK2kvJvtCT7O+Mr/L5+d+UUK7PuXrLK21m1DCW1MRe8MuUbWTtuSL1lTE1vtFSU9lbuNP6Y7Z4644LqaGUZaR9Uf3y55G4l4BnnQ3Sy6xY16SzwDizbasEbVoy1YYTsjTY6S2PfYw0EGMm+zhqEB62ysA4XAHMKp+uKvACplkZG1fSm6jWWKZpOAQMX2BzIDT4C14D3Tf6sT/ACfBWXAOXAZXwQ54BhbZEr+RB2sMQIv2GWyCwhuz3crK93VUr3mXVRWArAX/Azq6NKvqWlx1fX07uRZqSgjaLBr5StP7/zT1A1ZB+j2EYwjonEwXdY9fHwLW9lHCeSrh6xyKZy3/MUAiQXsxak8mDeeWAmZnpU9CuLbLb3+WE9uKA/GsVdXeUr4uTL3/J9ntt+KCR6kzhuf0t6Gp0ofJ7aPsPNuX+tc49JE3Br7EBAI3sSdjX5f1DVbiZVRT/Y9pME5Bfo2C59EfRna31ey14SakcM8wM3pvfgenuj0K6u2CM8zMvtWmv2TPyIGxBVI7HlvH8xfoZlO91LWArePtTpMbHIbdM6kB+YFWfQSQ3lYLHwuu02QS8veM77TlDUx3s6DTmRJ/1jqPJf7cDZx7a0O6QNI78Jh1fRIXMB2O9tQlcBHoxaep/wn0D88q+BTvCezQyNXm1d12Bc56CLRSSIrf2tOtuFUxak0Dvf1bvrVzM1NUmCJD+OfADMh+z2g2NCuaHc3Sgb9n/gFyaAu+lH9E5AAAAABJRU5ErkJggg=="
                    />
                </td>
            </tr>
            <tr>
                <td class="info-title">
                    构建信息
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
                            ${CHANGES_SINCE_LAST_SUCCESS,reverse=true,format="更新作者：%c",showPaths=true,changesFormat="[%a]",pathFormat="&nbsp;&nbsp;&nbsp;&nbsp;%p"}
                        </li>
                        <li>
                            ${CHANGES_SINCE_LAST_SUCCESS,reverse=true,format="更新信息：%c",showPaths=true,changesFormat="%m",pathFormat="&nbsp;&nbsp;&nbsp;&nbsp;%p"}
                        </li>
                    </ul>
                    <!-- ${CHANGES_SINCE_LAST_SUCCESS,reverse=true, format="Changes for Build #%n:<br />%c<br />",showPaths=true,changesFormat="<pre>[%a]<br />%m</pre>",pathFormat="&nbsp;&nbsp;&nbsp;&nbsp;%p"} -->

                    <!-- <hr size="2" width="100%" /> -->
                </td>
            </tr>
            <!-- <tr>
            <td class="info-title">构建日志(最后100行)</td>
        </tr>
        <tr>
            <td><p><pre>${BUILD_LOG, maxLines=100}</pre></p></td>
        </tr> -->
        </table>
    </body>
</html>
