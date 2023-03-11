## dev

```sh
shopify theme dev -s urtopia.myshopify.com -t urtopia-us/master

# or 

shopify theme dev --store urtopia.myshopify.com -theme urtopia-us/master
```


## push

```sh
shopify theme push --unpublished

# 一般情况下可能用不到
# 因为已经被设置为， git提交代码来实时同步shopify模板
# 除非你很明确 自己想干什么表情🤣
```


## publish

```sh
shopify theme publish

# 这个命令会直接发布到线上，请谨慎😃
```
