function randomRGB(){return Math.floor(256*Math.random())}document.addEventListener("DOMContentLoaded",function(t){{var n=[100,90,80,70,60,50,40,30,20,10],r=d3.select("body").append("svg").attr("width",500).attr("height",500),e=r.selectAll("circle").data(n).enter().append("circle");e.attr("cx",150).attr("cy",150).attr("r",function(t){return t}).style("fill",function(t){return"rgb("+randomRGB()+","+randomRGB()+","+randomRGB()+")"})}});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJyYW5kb21SR0IiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImNpcmNsZVJhZGlpIiwic3ZnQ29udGFpbmVyIiwiZDMiLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwiY2lyY2xlcyIsInNlbGVjdEFsbCIsImRhdGEiLCJlbnRlciIsImQiLCJzdHlsZSJdLCJtYXBwaW5ncyI6IkFBbUJBLFFBQUFBLGFBQ0EsTUFBQUMsTUFBQUMsTUFBQSxJQUFBRCxLQUFBRSxVQXBCQUMsU0FBQUMsaUJBQUEsbUJBQUEsU0FBQUMsR0FDQSxDQUFBLEdBQUFDLElBQUEsSUFBQSxHQUFBLEdBQUEsR0FBQSxHQUFBLEdBQUEsR0FBQSxHQUFBLEdBQUEsSUFDQUMsRUFBQUMsR0FBQUMsT0FBQSxRQUFBQyxPQUFBLE9BQ0FDLEtBQUEsUUFBQSxLQUNBQSxLQUFBLFNBQUEsS0FFQUMsRUFBQUwsRUFBQU0sVUFBQSxVQUNBQyxLQUFBUixHQUNBUyxRQUNBTCxPQUFBLFNBQ0FFLEdBQ0FELEtBQUEsS0FBQSxLQUNBQSxLQUFBLEtBQUEsS0FDQUEsS0FBQSxJQUFBLFNBQUFLLEdBQUEsTUFBQUEsS0FDQUMsTUFBQSxPQUFBLFNBQUFELEdBQ0EsTUFBQSxPQUFBakIsWUFBQSxJQUFBQSxZQUFBLElBQUFBLFlBQUEiLCJmaWxlIjoianMvYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgdmFyIGNpcmNsZVJhZGlpID0gWzEwMCwgOTAsIDgwLCA3MCwgNjAsIDUwLCA0MCwgMzAsIDIwLCAxMF07XG4gIHZhciBzdmdDb250YWluZXIgPSBkMy5zZWxlY3QoXCJib2R5XCIpLmFwcGVuZChcInN2Z1wiKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgNTAwKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIDUwMCk7XG5cbiAgdmFyIGNpcmNsZXMgPSBzdmdDb250YWluZXIuc2VsZWN0QWxsKFwiY2lyY2xlXCIpXG4gICAgLmRhdGEoY2lyY2xlUmFkaWkpXG4gICAgLmVudGVyKClcbiAgICAuYXBwZW5kKFwiY2lyY2xlXCIpO1xuICB2YXIgY2lyY2xlQXR0cmlidXRlcyA9IGNpcmNsZXNcbiAgICAuYXR0cihcImN4XCIsIDE1MClcbiAgICAuYXR0cihcImN5XCIsIDE1MClcbiAgICAuYXR0cihcInJcIiwgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQ7IH0pXG4gICAgLnN0eWxlKFwiZmlsbFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgcmV0dXJuIFwicmdiKFwiICsgcmFuZG9tUkdCKCkgKyBcIixcIiArIHJhbmRvbVJHQigpICsgXCIsXCIgKyByYW5kb21SR0IoKSArIFwiKVwiO1xuICAgIH0pO1xufSk7XG5cbmZ1bmN0aW9uIHJhbmRvbVJHQiAoKSB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9