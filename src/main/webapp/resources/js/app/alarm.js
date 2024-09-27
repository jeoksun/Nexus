document.addEventListener("DOMContentLoaded", function() {
	connectWs();
});

function connectWs() {
	const contextPath = document.body.dataset.contextPath;
	let domainName = location.href.split("/")[2];

	const socketUrl = `http://${domainName}${contextPath}/alarm`;
	socket = new SockJS(socketUrl);

	socket.onopen = function() {

		console.log('소켓 열려땅');
	};

	socket.onmessage = function(event) {
		// event.data는 HTML 문자열로 가정
		const data = JSON.parse(event.data);

		let title = data.eventType;


		// SweetAlert2를 사용해 메시지를 표시
		Swal.fire({
			title: title,
			html: data.htmlMessage,
			iconHtml: `
		    <div style="position: relative; display: inline-block;">
		        <img src="${contextPath}/resources/images/화면 캡처 2024-08-22 152751.png" 
		             style="width: 50px; height: 50px; border-radius: 50%; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); border: 2px solid #ddd; padding: 5px; background-color: #fff;">
		    </div>
		    `,
			position: 'top-end',
			showConfirmButton: false,
			timer: 15000,
			toast: true,
			background: '#ffffff',
			customClass: {
				popup: 'custom-swal-popup',
				title: 'custom-swal-title',
				htmlContainer: 'custom-swal-html',
				closeButton: 'custom-swal-close',
			},
			didOpen: () => {
				const style = document.createElement('style');
				style.innerHTML = `
		            .custom-swal-popup {
		                position: fixed;
		                top: 65px;
		                right: 200px;
		                z-index: 2147483647;
		                max-width: 350px;
		                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
		                border-radius: 15px;
		                padding: 20px;
		                background-color: #f3e5f5;
		            }
		            .custom-swal-title {
		                font-size: 1.5rem;
		                color: #333333;
		                font-weight: 600;
		                text-align: left;
		                margin-bottom: 10px;
		            }
		            .custom-swal-html {
		                font-size: 1rem;
		                color: #555555;
		                text-align: left;
		            }
		            .custom-swal-close {
		                position: absolute;
		                top: 10px;
		                right: 10px;
		                font-size: 1.2rem;
		                color: #999999;
		                background: #ffffff;
		                border-radius: 50%;
		                border: 1px solid #ddd;
		                padding: 5px;
		                transition: background 0.3s ease, color 0.3s ease;
		            }
		            .custom-swal-close:hover {
		                background: #f44336;
		                color: #ffffff;
		                cursor: pointer;
		            }
		        `;
				document.head.appendChild(style);
			}
		});
	};
	socket.onclose = function() {
		console.log('소켓 끄읕');
	};
}


