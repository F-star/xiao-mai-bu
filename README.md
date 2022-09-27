
基于维格表构建的小卖部货品价格清单。

首先你得熟悉维格表（vika.cn），在里面创建一个表，然后设置一些列选项，并拿到一些 id。

在根目录下创建一个 .env 文件，将这些 id 放到改文件下，例子：


```.env
VIKA_DATASHEET_ID=<你的表格id>
VIKA_TOKEN=<开发者 token>

# 表字段映射
VIKA_FIELD_GOOD_NAME=<商品字段名>
VIKA_FIELD_GOOD_CODE=<商品码字段名>
VIKA_FIELD_RPICE=<价格字段名>
```
