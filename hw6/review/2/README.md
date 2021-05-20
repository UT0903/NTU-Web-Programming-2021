1. 增加查詢特定範圍的 score，查詢範圍為 [From, To]，例如
   1. From: 60, To:100：會查詢所有 [60, 100] 之間的 score card
   2. From: 60, To:：會查詢所有 [60, inf] 之間的 score card
   3. From: , To:100：會查詢所有 [-inf, 100] 之間的 score card
2. 增加 And 的搜尋條件，同時勾選代表會查詢符合所有勾選條件的 score card
   1. Name: A, score from:60 , to:100：會查詢 name 為 A，且 score 為 [60, 100] 的 score card