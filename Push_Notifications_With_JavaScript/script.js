function askNotificationPermission() {
   // 권한을 실제로 요구하는 함수
   function handlePermission(permission) {
      // 사용자의 응답에 관계 없이 크롬이 정보를 저장할 수 있도록 함
      if (!('permission' in Notification)) {
         Notification.permission = permission;
      }

      // 사용자 응답에 따라 단추를 보이거나 숨기도록 설정
      if (Notification.permission === 'denied' || Notification.permission === 'default') {
         notificationBtn.style.display = 'block';
      } else {
         notificationBtn.style.display = 'none';
      }

      // 브라우저가 알림을 지원하는지 확인
      if (!('Notification' in window)) {
         console.log("이 브라우저는 알림을 지원하지 않습니다.");
      } else {
         if (checkNotificationPromise()) {
            Notification.requestPermission()
               .then((permission) => {
                  handlePermission(permission);
               })
         } else {
            Notification.requestPermission(function (permission) {
               handlePermission(permission);
            });
         }
      }
   }
}

//알림 권한 요청
function getNotificationPermission() {
   // 브라우저 지원 여부 체크    
   if (!("Notification" in window)) {
      alert("데스크톱 알림을 지원하지 않는 브라우저입니다.");
   } // 데스크탑 알림 권한 요청    
   Notification.requestPermission(function (result) {
      // 권한 거절        
      if (result == 'denied') {
         alert('알림을 차단하셨습니다.\n브라우저의 사이트 설정에서 변경하실 수 있습니다.');
         return false;
      }
   });
}

const button = document.querySelector("button")

button.addEventListener("click", () => {
   Notification.requestPermission().then(perm => {
      console.log(perm);
      if (perm === "granted") {
         const notification = new Notification("Example notification", {
            body: "This is more text",
            data: { hello: "world" },
            icon: "logo.png",
            // tag: "Welcome Message", // 알림을 덮어 쒸움
         })

         notification.addEventListener("close", e => {
            console.log(e)
         })
      }
   })
})

let notification
let interval

document.addEventListener("visibilitychange", () => {
   if(document.visibilityState === "hidden") {
      const leaveDate = new Date()
      interval = setInterval(() => {
         notification = new Notification("Come back please", {
            body: `You have been gone for ${Math.round(new Date() - leaveDate) / 1000}"seconds`,
            tag: "Come Back",
         })
      }, 100)
      
   } else {
      if(interval) clearInterval(interval)
      if(notification) notification.close()
   }
})