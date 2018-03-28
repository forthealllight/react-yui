/**
** component: 要显示的组件
** target: 鼠标点击的位置
** placement: 组件显示的位置
** isCenter: 看现实的组件是否要在鼠标点击的中间
**/
export function getLocation(component, target, placement, isCenter){
	var client = component.getBoundingClientRect(),
		// top = client.top,
		// left = client.left,
		// width = client.width,
		// height = client.height,
		{top, left, width, height} = client,
		// target = sdata.target,
		targetRact = target.getBoundingClientRect(),
		{top: sTop, left: sLeft, width: sWidth, height: sHeight} = targetRact,
		// sTop = targetRact.top,
  //       sLeft = targetRact.left,
		// placement = sdata.placement,
		arrowDirction,
		scrollTop = 0;

		if (document.documentElement &&
			document.documentElement.scrollTop) {
			scrollTop = document.documentElement.scrollTop;
		} else if (document.body) {
			scrollTop = document.body.scrollTop;
		}
		sTop += scrollTop;
	// Regular.dom.addClass(toolTip, "zoom-big-enter zoom-big-enter-active");
	if(!placement){
		top = (sTop - height);
		left = (sLeft - parseInt(width/2));

		// top = top < 0 ? 0 : top;
		// left = left < 0 ? 0 : left;
	}else{
		switch(placement){
			case "right":
				top = ~~(sTop - height/2 + sHeight/2);
				left = sLeft + targetRact.width + 8;//8箭头的宽度
				arrowDirction = "left"
				if(left + width > document.body.clientWidth){//太右边了，就放在左边
					left = sLeft - width;
					arrowDirction = "right";
				}
				break;
			case "left":
				top = ~~(sTop - (height - sHeight)/2);
				left = sLeft - width;
				arrowDirction = "right";
				// if(left + width > document.body.clientWidth){//太右边了，就放在左边
				// 	left = sLeft - width - 8;
				// 	arrowDirction = "left";
				// }
				break;
			case "top":

				if(isCenter){
					left = ~~(sLeft - (width - sWidth)/2);
					top = ~~(sTop - height -8) ;
				}else{
					left = sLeft;
					top = ~~(sTop - height) ;
				}

				arrowDirction = "bottom";
				// top = top < 0 ? 0 : top;
				// left = left < 0 ? 0 : left;
				break;
			case "bottom":

				if(isCenter){
					left = ~~(sLeft - (width - sWidth)/2);
					top = sTop + sHeight + 8;
				}else{
					left = sLeft;
					top = sTop + sHeight;
				}

				arrowDirction = "top";
				// if(left + width > document.body.clientWidth){//太右边了，就放在左边
				// 	left = sLeft - width - 8;
				// 	arrowDirction = "left";
				// }
				break;
		}

	}
	top = top < 0 ? 0 : top;
	left = left < 0 ? 0 : left;
	return {
		left,
		top,
		arrowDirction
	}
}
