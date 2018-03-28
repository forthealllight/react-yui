<Tree multiple={false} list={} selectId={newList} onSelect={function(x){console.log(x)}}/>
newList=[{
    id: "1",
    name:"部门1",
    deptName:"部门1",
    showChildren:false,
    showLoading:false,
    hasChildren: false,
    children:[{
        id: "1-1",
        name:"部门1-1",
        deptName:"部门1-1",
        showChildren:false,
        showLoading:false,
        hasChildren: false,
        children: []
      },
      {
        id:"1-2",
        name:"部门1-2",
        deptName:"部门1-2",
        showChildren:false,
        showLoading:false,
        hasChildren: false,
        children: []
        },
      {
        id:"1-3",
        name:"部门1-3",
        deptName:"部门1-3",
        showChildren:false,
        showLoading:false,
        hasChildren: false,
        children: []
      }

    ]
  },{
      id: "2",
      name:"部门2",
      deptName:"部门2",
      showChildren:false,
      showLoading:false,
      hasChildren: true,
      children: [{
          id: "2-1",
          name:"部门2-1",
          deptName:"部门2-1",
          showChildren:false,
          showLoading:false,
          hasChildren: false,
          children: []
        },
        {
            id:"2-2",
            name:"部门2-2",
            deptName:"部门2-2",
            showChildren:false,
            showLoading:false,
            hasChildren: false,
            children: []
          }

      ]
    }]
