USE Airline_management;

-- Có 10 sân bay. Thời gian bay tối thiểu là 30 phút. Có tối đa 2 sân bay trung gian với thời gian dừng từ 10 đến 20 phút.
-- Chỉ cho đặt vé chậm nhất 1 ngày trước khi khởi hành, hủy vé trước 3 ngày.USE Airline_management;

INSERT INTO rules (
		ruleID,
        minFlightDuration,
        maxIntermediateAirport,
        minIntermediateAirportStopDelay,
        maxIntermediateAirportStopDelay,
        minBookingTime,
        minCancelBookingTime
    )
VALUES('available_rule', 0.50, 2, 10, 20, 1, 3);