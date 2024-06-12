USE Airline_management;

-- Chỉ cho đặt vé chậm nhất 1 ngày trước khi khởi hành, hủy vé trước 3 ngày.
INSERT INTO booking_rule (
        bookingRuleId,
        minBookingTime,
        minCancelBookingTime
    )
VALUES('available_rule', 1, 3);

-- Có 10 sân bay. Thời gian bay tối thiểu là 30 phút. Có tối đa 2 sân bay trung gian với thời gian dừng từ 10 đến 20 phút.

INSERT INTO airport_rule (
        airportRuleId,
        minFlightDuration,
        maxIntermediateAirport,
        minIntermediateAirportStopDelay,
        maxIntermediateAirportStopDelay
    )
VALUES ('available_rule', 0.50, 2, 10, 20);