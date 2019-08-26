let treeList=[];
function restTree() {
    treeList=[];
}
//权限树
function convertAuthor(tree) {
    tree.forEach((item) => {
        let children = item.children;
        item.disabled=true;
        if (children && children.length > 0) {
            children = convertAuthor(children)
        }
        if (item.checked&&children==undefined) {
            treeList.push(item.id);
        }
    });
    return treeList
}
//获取userId push进数组
function getUserIdList(tree) {
    let userIdList=[];
    tree.forEach((item) => {
        console.log("item.roleId==="+item.roleId);
        if (item.roleId) {
            console.log("item.roleId==="+item.roleId);
        }
        userIdList.push(item.roleId);
    });
    console.log(userIdList);
    return userIdList
}
//设置不可点击
function noCheckTree(tree) {
    tree.forEach((item) => {
        let children = item.children;
        if (children && children.length > 0) {
            children = noCheckTree(children)
        }
        if (item.checked&&children==undefined) {
            treeList.push(item.id);
        }
    });
    return treeList
}
export {
    convertAuthor,
    restTree,
    getUserIdList,
    noCheckTree,
}
