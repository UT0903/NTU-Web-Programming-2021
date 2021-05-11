1. 改變parseInt方法，改成用regex+Number做嚴格的數值轉換
2. axios error handling 有三種情況
   1. request成功 sent，但收到error response
   2. request成功sent，但沒收到response
   3. request在client端沒有成功送出
3. 如果同一分鐘內server重開n次，會有精確到秒的n個log檔案