function getRangeValues(){return{carNumber:document.getElementById("carNumber").value,solarNumber:document.getElementById("solarNumber").value,homeNumber:document.getElementById("homeNumber").value,windfarmNumber:document.getElementById("windfarmNumber").value,bicycleNumber:document.getElementById("bicycleNumber").value}}function updateCharts(e,t){document.getElementById(e+"Number").value=t,document.getElementById(e+"Range").value=t;var n=shockingUpdate(getRangeValues());updateGraph("gwh-chart",n.gen_production),updateGraph("co2-chart",{Geothermal:n.gen_emissions.Geothermal,Coal:n.gen_emissions.Coal,Gas:n.gen_emissions.Gas,Road:n.fleet_emissions.Road})}function preprocessData(e,t){var n=[1],r=0;for(var a in e)e.hasOwnProperty(a)&&(r+=e[a],n.push(e[a]));t>0&&n.push(t);for(var o=1;o<n.length;o++)n[o]=Math.round(n[o]/r*100);return n}function updateTotal(e,t){var n=0;for(var r in t)t.hasOwnProperty(r)&&(n+=t[r]);return n=Math.round(n),document.getElementById(e).innerHTML=n,n}function assignColors(e,t){var n=[];switch(e){case"co2":n.push("#ff9900"),n.push("#999999"),n.push("#f3f3f3"),n.push("#34495e");break;case"gwh":n.push("#6d9eeb"),n.push("#ff9900"),n.push("#c9daf8"),n.push("#999999"),n.push("#f3f3f3"),n.push("#ffd966");break;case"cost":break;case"investment":}return t>0&&n.push("none"),n}function updateGraph(e,t){var n=80,r=300,a=e.split("-")[0],o=a+"-total",s=updateTotal(o,t);totals[o]||(totals[o]=parseInt(document.getElementById(o).innerHTML,10));for(var u=totals[o]-s,l=document.getElementById(e);l.firstChild;)l.removeChild(l.firstChild);var c=d3.select("#"+e).append("svg:svg").attr("class","chart").attr("width",n).attr("height",r).append("svg:g").attr("transform","translate(0,"+r+")"),d=[preprocessData(t,u)],i=assignColors(a,u);x=d3.scale.ordinal().rangeRoundBands([0,n]),y=d3.scale.linear().range([0,r]),z=d3.scale.ordinal().range(i);for(var m=[],g=1;g<d[0].length;g++)m.push("c"+g);var p=m.map(function(e,t){return d.map(function(e,n){return{x:n,y:e[t+1]}})}),h=d3.layout.stack()(p);x.domain(h[0].map(function(e){return e.x})),y.domain([0,d3.max(h[h.length-1],function(e){return e.y0+e.y})]);{var f=c.selectAll("g.valgroup").data(h).enter().append("svg:g").attr("class","valgroup").style("fill",function(e,t){return z(t)}).style("stroke",function(e,t){return"none"!==z(t)?d3.rgb(z(t)).darker():"none"});f.selectAll("rect").data(function(e){return e}).enter().append("svg:rect").attr("x",function(e){return x(e.x)}).attr("y",function(e){return-y(e.y0)-y(e.y)}).attr("height",function(e){return y(e.y)}).attr("width",Math.min.apply(null,[x.rangeBand()-2,100]))}}function randomRGB(){return Math.floor(256*Math.random())}function columnGraph(e,t){for(var n=80,r=300,a=d3.select(e).append("svg:svg").attr("class","chart").attr("width",n).attr("height",r).append("svg:g").attr("transform","translate(0,300)"),o=[t],s=[],u=0;u<o[0].length-1;u++)s.push("rgb("+randomRGB()+","+randomRGB()+","+randomRGB()+")");x=d3.scale.ordinal().rangeRoundBands([0,n]),y=d3.scale.linear().range([0,r]),z=d3.scale.ordinal().range(s);var l=["c1","c2","c3","c4","c5"].map(function(e,t){return o.map(function(e,n){return{x:n,y:e[t+1]}})}),c=d3.layout.stack()(l);x.domain(c[0].map(function(e){return e.x})),y.domain([0,d3.max(c[c.length-1],function(e){return e.y0+e.y})]);{var d=a.selectAll("g.valgroup").data(c).enter().append("svg:g").attr("class","valgroup").style("fill",function(e,t){return z(t)}).style("stroke",function(e,t){return d3.rgb(z(t)).darker()});d.selectAll("rect").data(function(e){return e}).enter().append("svg:rect").attr("x",function(e){return x(e.x)}).attr("y",function(e){return-y(e.y0)-y(e.y)}).attr("height",function(e){return y(e.y)}).attr("width",Math.min.apply(null,[x.rangeBand()-2,100]))}}function shockingUpdate(e){var t=getBaseline(),n=t.gen_production,r=t.gen_emissions,a=t.gen_cost,o={},s={Road:12688},u=e.carNumber,l=u/100;s.Road=s.Road*(1-l),ev_power_reqts=2406.4*3341013*l,ev_power_reqts/=1e6;var c=0;for(var d in n)c+=n[d];var i=1+ev_power_reqts/c,m=e.solarNumber,g=5260*m;g/=1e6;var p=g/c;i-=p;for(var d in n)n[d]=n[d]*i;n.Solar=g;for(var d in r)r[d]=r[d]*i;for(var d in r)r[d]=r[d]*i;for(var d in a)a[d]=a[d]*i;var h={gen_production:n,gen_emissions:r,gen_cost:a,gen_capital_cost:o,fleet_emissions:s};return h}function getBaseline(){var e={Hydro:24095,Geothermal:6487,Wind:2187,Coal:1832,Gas:6626,Solar:0},t={Hydro:0,Geothermal:847.32,Wind:0,Coal:1222.2,Gas:3405.51},n={Hydro:53872180,Geothermal:59535e3,Wind:43484e3,Coal:34177200,Gas:161044192},r={gen_production:e,gen_emissions:t,gen_cost:n};return r}function powerOff(){document.body.style.display="none",document.getElementsByTagName("html")[0].style.backgroundColor="black",setTimeout(function(){document.body.style.display="block",document.getElementsByTagName("html")[0].style.backgroundColor="none"},3e3)}var totals={};document.addEventListener("DOMContentLoaded",function(e){updateCharts("car",0),columnGraph("#cost-chart",[1,10,15,15,35,50]),columnGraph("#investment-chart",[1,5,10,15,45,50])});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNoYXJ0LmpzIiwiZW5naW5lLmpzIiwidWkuanMiXSwibmFtZXMiOlsiZ2V0UmFuZ2VWYWx1ZXMiLCJjYXJOdW1iZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwidmFsdWUiLCJzb2xhck51bWJlciIsImhvbWVOdW1iZXIiLCJ3aW5kZmFybU51bWJlciIsImJpY3ljbGVOdW1iZXIiLCJ1cGRhdGVDaGFydHMiLCJwcmVmaXgiLCJkYXRhIiwic2hvY2tpbmdVcGRhdGUiLCJ1cGRhdGVHcmFwaCIsImdlbl9wcm9kdWN0aW9uIiwiR2VvdGhlcm1hbCIsImdlbl9lbWlzc2lvbnMiLCJDb2FsIiwiR2FzIiwiUm9hZCIsImZsZWV0X2VtaXNzaW9ucyIsInByZXByb2Nlc3NEYXRhIiwiZGVsdGEiLCJ2YWx1ZXMiLCJ0b3RhbCIsImsiLCJoYXNPd25Qcm9wZXJ0eSIsInB1c2giLCJpIiwibGVuZ3RoIiwiTWF0aCIsInJvdW5kIiwidXBkYXRlVG90YWwiLCJ0b3RhbElkIiwiaW5uZXJIVE1MIiwiYXNzaWduQ29sb3JzIiwiY29sb3JzIiwiYmluZFRvIiwidyIsImgiLCJzcGxpdCIsIm5ld1RvdGFsIiwidG90YWxzIiwicGFyc2VJbnQiLCJlbGVtZW50IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwic3ZnIiwiZDMiLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwibWF0cml4IiwieCIsInNjYWxlIiwib3JkaW5hbCIsInJhbmdlUm91bmRCYW5kcyIsInkiLCJsaW5lYXIiLCJyYW5nZSIsInoiLCJhIiwicmVtYXBwZWQiLCJtYXAiLCJkYXQiLCJkIiwiaWkiLCJzdGFja2VkIiwibGF5b3V0Iiwic3RhY2siLCJkb21haW4iLCJtYXgiLCJ5MCIsInZhbGdyb3VwIiwic2VsZWN0QWxsIiwiZW50ZXIiLCJzdHlsZSIsInJnYiIsImRhcmtlciIsIm1pbiIsImFwcGx5IiwicmFuZ2VCYW5kIiwicmFuZG9tUkdCIiwiZmxvb3IiLCJyYW5kb20iLCJjb2x1bW5HcmFwaCIsImlucHV0cyIsImJhc2VsaW5lIiwiZ2V0QmFzZWxpbmUiLCJnZW5fY29zdCIsImdlbl9jYXBpdGFsX2Nvc3QiLCJlbGVjdHJpY19jYXJzIiwiZWxlY3RyaWNfcGN0IiwiZXZfcG93ZXJfcmVxdHMiLCJ0b3RhbF9nZW4iLCJrZXkiLCJpbmNyZWFzZV9pbl9wb3dlcl9yZXF0cyIsInNvbGFyX2hvdXNlcyIsInNvbGFyX3Byb2R1Y3Rpb24iLCJkZWNyZWFzZV9kdWVfdG9fc29sYXIiLCJyZXN1bHQiLCJIeWRybyIsIldpbmQiLCJTb2xhciIsInBvd2VyT2ZmIiwiYm9keSIsImRpc3BsYXkiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImJhY2tncm91bmRDb2xvciIsInNldFRpbWVvdXQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiXSwibWFwcGluZ3MiOiJBQWFBLFFBQUFBLGtCQUNBLE9BQ0FDLFVBQUFDLFNBQUFDLGVBQUEsYUFBQUMsTUFDQUMsWUFBQUgsU0FBQUMsZUFBQSxlQUFBQyxNQUNBRSxXQUFBSixTQUFBQyxlQUFBLGNBQUFDLE1BQ0FHLGVBQUFMLFNBQUFDLGVBQUEsa0JBQUFDLE1BQ0FJLGNBQUFOLFNBQUFDLGVBQUEsaUJBQUFDLE9BSUEsUUFBQUssY0FBQUMsRUFBQU4sR0FDQUYsU0FBQUMsZUFBQU8sRUFBQSxVQUFBTixNQUFBQSxFQUNBRixTQUFBQyxlQUFBTyxFQUFBLFNBQUFOLE1BQUFBLENBRUEsSUFBQU8sR0FBQUMsZUFBQVosaUJBRUFhLGFBQUEsWUFBQUYsRUFBQUcsZ0JBQ0FELFlBQUEsYUFDQUUsV0FBQUosRUFBQUssY0FBQSxXQUNBQyxLQUFBTixFQUFBSyxjQUFBLEtBQ0FFLElBQUFQLEVBQUFLLGNBQUEsSUFDQUcsS0FBQVIsRUFBQVMsZ0JBQUEsT0NoQ0EsUUFBQUMsZ0JBQUFWLEVBQUFXLEdBQ0EsR0FBQUMsSUFBQSxHQUNBQyxFQUFBLENBQ0EsS0FBQSxHQUFBQyxLQUFBZCxHQUNBQSxFQUFBZSxlQUFBRCxLQUNBRCxHQUFBYixFQUFBYyxH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LEtBQUE3QixNQUFBOEIsUUFBQSxRQUNBeEcsU0FBQXlHLHFCQUFBLFFBQUEsR0FBQS9CLE1BQUFnQyxnQkFBQSxRQUNBLEtIUEEsR0FBQWxFLFVBRUF4QyxVQUFBNEcsaUJBQUEsbUJBQUEsU0FBQUMsR0FDQXRHLGFBQUEsTUFBQSxHQUNBNEUsWUFBQSxlQUNBLEVBQUEsR0FBQSxHQUFBLEdBQUEsR0FBQSxLQUVBQSxZQUFBLHFCQUNBLEVBQUEsRUFBQSxHQUFBLEdBQUEsR0FBQSIsImZpbGUiOiJqcy9hbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdG90YWxzID0ge307XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIHVwZGF0ZUNoYXJ0cygnY2FyJywgMCk7XG4gIGNvbHVtbkdyYXBoKFwiI2Nvc3QtY2hhcnRcIiwgW1xuICAgIDEsIDEwLCAxNSwgMTUsIDM1LCA1MFxuICBdKTtcbiAgY29sdW1uR3JhcGgoXCIjaW52ZXN0bWVudC1jaGFydFwiLCBbXG4gICAgMSwgNSwgMTAsIDE1LCA0NSwgNTBcbiAgXSk7XG59KTtcblxuLy8gRWFjaCBzbGlkZXIncyB2YWx1ZSwgdG8gcGFzcyB0byBjYWxjdWxhdG9yXG5mdW5jdGlvbiBnZXRSYW5nZVZhbHVlcyAoKSB7XG4gIHJldHVybiB7XG4gICAgJ2Nhck51bWJlcic6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJOdW1iZXInKS52YWx1ZSxcbiAgICAnc29sYXJOdW1iZXInOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc29sYXJOdW1iZXInKS52YWx1ZSxcbiAgICAnaG9tZU51bWJlcic6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob21lTnVtYmVyJykudmFsdWUsXG4gICAgJ3dpbmRmYXJtTnVtYmVyJzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbmRmYXJtTnVtYmVyJykudmFsdWUsXG4gICAgJ2JpY3ljbGVOdW1iZXInOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmljeWNsZU51bWJlcicpLnZhbHVlXG4gIH07XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNoYXJ0cyAocHJlZml4LCB2YWx1ZSkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcmVmaXggKyAnTnVtYmVyJykudmFsdWUgPSB2YWx1ZTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJlZml4ICsgJ1JhbmdlJykudmFsdWUgPSB2YWx1ZTtcblxuICB2YXIgZGF0YSA9IHNob2NraW5nVXBkYXRlKGdldFJhbmdlVmFsdWVzKCkpO1xuXG4gIHVwZGF0ZUdyYXBoKCdnd2gtY2hhcnQnLCBkYXRhLmdlbl9wcm9kdWN0aW9uKTtcbiAgdXBkYXRlR3JhcGgoJ2NvMi1jaGFydCcsIHtcbiAgICAnR2VvdGhlcm1hbCc6IGRhdGEuZ2VuX2VtaXNzaW9uc1snR2VvdGhlcm1hbCddLFxuICAgICdDb2FsJzogZGF0YS5nZW5fZW1pc3Npb25zWydDb2FsJ10sXG4gICAgJ0dhcyc6IGRhdGEuZ2VuX2VtaXNzaW9uc1snR2FzJ10sXG4gICAgJ1JvYWQnOiBkYXRhLmZsZWV0X2VtaXNzaW9uc1snUm9hZCddXG4gIH0pO1xufVxuIiwiLy8gR2V0IHRoaW5ncyB3b3JraW5nIGZvciBwcm9vZiBvZiBjb25jZXB0OlxuLy8gY29udmVydCBkYXRhIG9iamVjdCB0byBhcnJheVxuZnVuY3Rpb24gcHJlcHJvY2Vzc0RhdGEgKGRhdGEsIGRlbHRhKSB7XG4gIHZhciB2YWx1ZXMgPSBbMV07XG4gIHZhciB0b3RhbCA9IDA7XG4gIGZvciAodmFyIGsgaW4gZGF0YSkge1xuICAgIGlmKGRhdGEuaGFzT3duUHJvcGVydHkoaykpe1xuICAgICAgdG90YWwgKz0gZGF0YVtrXTtcbiAgICAgIHZhbHVlcy5wdXNoKGRhdGFba10pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGRlbHRhIHJlcHJlc2VudHMgZGlmZmVyZW5jZSBmcm9tIG9yaWdpbmFsIHRvdGFsIHZhbHVlXG4gIGlmIChkZWx0YSA+IDApIHtcbiAgICB2YWx1ZXMucHVzaChkZWx0YSk7XG4gIH1cblxuICAvLyBOZWVkIHBlcmNlbnQgdmFsdWVzIGZvciBjaGFydFxuICBmb3IgKHZhciBpID0gMTsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhbHVlc1tpXSA9IE1hdGgucm91bmQoKHZhbHVlc1tpXSAvIHRvdGFsKSAqIDEwMCk7XG4gIH1cblxuICByZXR1cm4gdmFsdWVzO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUb3RhbCh0b3RhbElkLCBkYXRhKSB7XG4gIHZhciB0b3RhbCA9IDA7XG4gIGZvciAodmFyIGsgaW4gZGF0YSkge1xuICAgIGlmKGRhdGEuaGFzT3duUHJvcGVydHkoaykpe1xuICAgICAgdG90YWwgKz0gZGF0YVtrXTtcbiAgICB9XG4gIH1cbiAgdG90YWwgPSBNYXRoLnJvdW5kKHRvdGFsKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodG90YWxJZCkuaW5uZXJIVE1MID0gdG90YWw7XG5cbiAgcmV0dXJuIHRvdGFsO1xufVxuXG5mdW5jdGlvbiBhc3NpZ25Db2xvcnMocHJlZml4LCBkZWx0YSkge1xuICB2YXIgY29sb3JzID0gW107XG5cbiAgc3dpdGNoIChwcmVmaXgpIHtcbiAgICBjYXNlICdjbzInOlxuICAgICAgY29sb3JzLnB1c2goJyNmZjk5MDAnKTsgLy8gR2VvdGhlcm1hbFxuICAgICAgY29sb3JzLnB1c2goJyM5OTk5OTknKTsgLy8gQ29hbFxuICAgICAgY29sb3JzLnB1c2goJyNmM2YzZjMnKTsgLy8gR2FzXG4gICAgICBjb2xvcnMucHVzaCgnIzM0NDk1ZScpOyAvLyBSb2FkXG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2d3aCc6XG4gICAgICAvLyBPcmRlciBtYXR0ZXJzLCBzYWRseVxuICAgICAgY29sb3JzLnB1c2goJyM2ZDllZWInKTsgLy8gSHlkcm9cbiAgICAgIGNvbG9ycy5wdXNoKCcjZmY5OTAwJyk7IC8vIEdlb3RoZXJtYWxcbiAgICAgIGNvbG9ycy5wdXNoKCcjYzlkYWY4Jyk7IC8vIFdpbmRcbiAgICAgIGNvbG9ycy5wdXNoKCcjOTk5OTk5Jyk7IC8vIENvYWxcbiAgICAgIGNvbG9ycy5wdXNoKCcjZjNmM2YzJyk7IC8vIEdhc1xuICAgICAgY29sb3JzLnB1c2goJyNmZmQ5NjYnKTsgLy8gU29sYXJcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnY29zdCc6XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2ludmVzdG1lbnQnOlxuICAgICAgYnJlYWs7XG4gIH1cblxuICAvLyBQYWRkaW5nIGNvbG91clxuICBpZiAoZGVsdGEgPiAwKSB7XG4gICAgY29sb3JzLnB1c2goJ25vbmUnKTtcbiAgfVxuXG4gIHJldHVybiBjb2xvcnM7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUdyYXBoIChiaW5kVG8sIGRhdGEpIHtcbiAgdmFyIHcgPSA4MDtcbiAgdmFyIGggPSAzMDA7XG5cbiAgdmFyIHByZWZpeCA9IGJpbmRUby5zcGxpdCgnLScpWzBdO1xuICB2YXIgdG90YWxJZCA9IHByZWZpeCArICctdG90YWwnO1xuICB2YXIgbmV3VG90YWwgPSB1cGRhdGVUb3RhbCh0b3RhbElkLCBkYXRhKTtcblxuICAvLyBTdG9yZSBhcyBnbG9iYWwgZm9yIHRoZSBsaWZlIG9mIHRoZSBkb2N1bWVudFxuICBpZiAoIXRvdGFsc1t0b3RhbElkXSkge1xuICAgIHRvdGFsc1t0b3RhbElkXSA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRvdGFsSWQpLmlubmVySFRNTCwgMTApO1xuICB9XG4gIHZhciBkZWx0YSA9IHRvdGFsc1t0b3RhbElkXSAtIG5ld1RvdGFsO1xuXG4gIC8vIEhhY2t5OiByZW1vdmUgY2hhcnQgaWYgaXQgZXhpc3RzXG4gIC8vIFRPRE86IHRyYW5zaXRpb24hXG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYmluZFRvKTtcbiAgd2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcbiAgfVxuXG4gIHZhciBzdmcgPSBkMy5zZWxlY3QoJyMnICsgYmluZFRvKS5hcHBlbmQoXCJzdmc6c3ZnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcImNoYXJ0XCIpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB3KVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGggKVxuICAgIC5hcHBlbmQoXCJzdmc6Z1wiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsXCIgKyBoICsgXCIpXCIpO1xuXG4gIC8vIElmIGRpZmZlcmVuY2UgYmV0d2VlbiB0b3RhbHMgaXMgcG9zaXRpdmUsIGFuIGFkZGl0aW9uYWwgYXJyYXkgZWxlbWVudFxuICAvLyB3aWxsIGJlIGFkZGVkIHRvIHBhZCB0aGUgY2hhcnQgYXMgdGhlIHRvdGFsIHNocmlua3NcbiAgdmFyIG1hdHJpeCA9IFtwcmVwcm9jZXNzRGF0YShkYXRhLCBkZWx0YSldO1xuICB2YXIgY29sb3JzID0gYXNzaWduQ29sb3JzKHByZWZpeCwgZGVsdGEpO1xuXG4gIHggPSBkMy5zY2FsZS5vcmRpbmFsKCkucmFuZ2VSb3VuZEJhbmRzKFswLCB3XSk7XG4gIHkgPSBkMy5zY2FsZS5saW5lYXIoKS5yYW5nZShbMCwgaF0pO1xuICB6ID0gZDMuc2NhbGUub3JkaW5hbCgpLnJhbmdlKGNvbG9ycyk7XG5cbiAgLy8gQ29wZSB3aXRoIHZhcmlhYmxlIG51bWJlciBvZiBwcm9wZXJ0aWVzLCBmb3Igbm93XG4gIHZhciBhID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgbWF0cml4WzBdLmxlbmd0aDsgaSsrKSB7XG4gICAgYS5wdXNoKFwiY1wiICsgaSk7XG4gIH1cbiAgLy92YXIgcmVtYXBwZWQgPSBbXCJjMVwiLFwiYzJcIixcImMzXCIsXCJjNFwiLFwiYzVcIl0ubWFwKGZ1bmN0aW9uKGRhdCxpKXtcbiAgdmFyIHJlbWFwcGVkID0gYS5tYXAoZnVuY3Rpb24oZGF0LGkpe1xuICAgIHJldHVybiBtYXRyaXgubWFwKGZ1bmN0aW9uKGQsaWkpe1xuICAgICAgcmV0dXJuIHt4OiBpaSwgeTogZFtpKzFdIH07XG4gICAgfSlcbiAgfSk7XG5cbiAgdmFyIHN0YWNrZWQgPSBkMy5sYXlvdXQuc3RhY2soKShyZW1hcHBlZClcblxuICB4LmRvbWFpbihzdGFja2VkWzBdLm1hcChmdW5jdGlvbihkKSB7IHJldHVybiBkLng7IH0pKTtcbiAgeS5kb21haW4oWzAsIGQzLm1heChzdGFja2VkW3N0YWNrZWQubGVuZ3RoIC0gMV0sIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQueTAgKyBkLnk7IH0pXSk7XG5cbiAgdmFyIHZhbGdyb3VwID0gc3ZnLnNlbGVjdEFsbChcImcudmFsZ3JvdXBcIilcbiAgICAuZGF0YShzdGFja2VkKVxuICAgIC5lbnRlcigpLmFwcGVuZChcInN2ZzpnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcInZhbGdyb3VwXCIpXG4gICAgLnN0eWxlKFwiZmlsbFwiLCBmdW5jdGlvbihkLCBpKSB7IHJldHVybiB6KGkpOyB9KVxuICAgIC5zdHlsZShcInN0cm9rZVwiLCBmdW5jdGlvbihkLCBpKSB7IFxuICAgICAgaWYgKHooaSkgIT09ICdub25lJykge1xuICAgICAgICByZXR1cm4gZDMucmdiKHooaSkpLmRhcmtlcigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuICdub25lJztcbiAgICB9KTtcblxuICB2YXIgcmVjdCA9IHZhbGdyb3VwLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAuZGF0YShmdW5jdGlvbihkKXtyZXR1cm4gZDt9KVxuICAgIC5lbnRlcigpLmFwcGVuZChcInN2ZzpyZWN0XCIpXG4gICAgLmF0dHIoXCJ4XCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHgoZC54KTsgfSlcbiAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gLXkoZC55MCkgLSB5KGQueSk7IH0pXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4geShkLnkpOyB9KVxuICAgIC5hdHRyKFwid2lkdGhcIiwgTWF0aC5taW4uYXBwbHkobnVsbCwgW3gucmFuZ2VCYW5kKCktMiwgMTAwXSkpO1xufVxuXG5mdW5jdGlvbiByYW5kb21SR0IgKCkge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KTtcbn1cblxuZnVuY3Rpb24gY29sdW1uR3JhcGggKGJpbmRUbywgdmFsdWVzKSB7XG4gIHZhciB3ID0gODA7XG4gIHZhciBoID0gMzAwO1xuXG4gIHZhciBzdmcgPSBkMy5zZWxlY3QoYmluZFRvKS5hcHBlbmQoXCJzdmc6c3ZnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcImNoYXJ0XCIpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB3KVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGggKVxuICAgIC5hcHBlbmQoXCJzdmc6Z1wiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsMzAwKVwiKTtcblxuICB2YXIgbWF0cml4ID0gW3ZhbHVlc107XG5cbiAgLy8gUmFuZG9tIGZvciBub3dcbiAgdmFyIGNvbG9ycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG1hdHJpeFswXS5sZW5ndGggLTE7IGkrKykge1xuICAgIGNvbG9ycy5wdXNoKCdyZ2IoJyArIHJhbmRvbVJHQigpICsgJywnICsgcmFuZG9tUkdCKCkgKyAnLCcgKyByYW5kb21SR0IoKSArICcpJyk7XG4gIH1cblxuICB4ID0gZDMuc2NhbGUub3JkaW5hbCgpLnJhbmdlUm91bmRCYW5kcyhbMCwgd10pO1xuICB5ID0gZDMuc2NhbGUubGluZWFyKCkucmFuZ2UoWzAsIGhdKTtcbiAgeiA9IGQzLnNjYWxlLm9yZGluYWwoKS5yYW5nZShjb2xvcnMpO1xuXG4gIHZhciByZW1hcHBlZCA9W1wiYzFcIixcImMyXCIsXCJjM1wiLFwiYzRcIixcImM1XCJdLm1hcChmdW5jdGlvbihkYXQsaSl7XG4gICAgcmV0dXJuIG1hdHJpeC5tYXAoZnVuY3Rpb24oZCxpaSl7XG4gICAgICByZXR1cm4ge3g6IGlpLCB5OiBkW2krMV0gfTtcbiAgICB9KVxuICB9KTtcblxuICB2YXIgc3RhY2tlZCA9IGQzLmxheW91dC5zdGFjaygpKHJlbWFwcGVkKTtcblxuICB4LmRvbWFpbihzdGFja2VkWzBdLm1hcChmdW5jdGlvbihkKSB7IHJldHVybiBkLng7IH0pKTtcbiAgeS5kb21haW4oWzAsIGQzLm1heChzdGFja2VkW3N0YWNrZWQubGVuZ3RoIC0gMV0sIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQueTAgKyBkLnk7IH0pXSk7XG5cbiAgdmFyIHZhbGdyb3VwID0gc3ZnLnNlbGVjdEFsbChcImcudmFsZ3JvdXBcIilcbiAgICAuZGF0YShzdGFja2VkKVxuICAgIC5lbnRlcigpLmFwcGVuZChcInN2ZzpnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcInZhbGdyb3VwXCIpXG4gICAgLnN0eWxlKFwiZmlsbFwiLCBmdW5jdGlvbihkLCBpKSB7IHJldHVybiB6KGkpOyB9KVxuICAgIC5zdHlsZShcInN0cm9rZVwiLCBmdW5jdGlvbihkLCBpKSB7IHJldHVybiBkMy5yZ2IoeihpKSkuZGFya2VyKCk7IH0pO1xuXG4gIHZhciByZWN0ID0gdmFsZ3JvdXAuc2VsZWN0QWxsKFwicmVjdFwiKVxuICAgIC5kYXRhKGZ1bmN0aW9uKGQpe3JldHVybiBkO30pXG4gICAgLmVudGVyKCkuYXBwZW5kKFwic3ZnOnJlY3RcIilcbiAgICAuYXR0cihcInhcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4geChkLngpOyB9KVxuICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7IHJldHVybiAteShkLnkwKSAtIHkoZC55KTsgfSlcbiAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7IHJldHVybiB5KGQueSk7IH0pXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCBNYXRoLm1pbi5hcHBseShudWxsLCBbeC5yYW5nZUJhbmQoKS0yLCAxMDBdKSk7XG59XG5cbiIsIi8vIHJlZmVyZW5jZTogaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vc3ByZWFkc2hlZXRzL2QvMXJqWlpnMTlnSDRTVDNYRmZQYVVtdmdDOTBBQ0tnUnc4eC1NZ29vemtMZkkvZWRpdCNnaWQ9MFxuXG5cbmZ1bmN0aW9uIHNob2NraW5nVXBkYXRlKGlucHV0cykge1xuXG5cdHZhciBiYXNlbGluZSAgICAgICAgID0gZ2V0QmFzZWxpbmUoKTtcblx0dmFyIGdlbl9wcm9kdWN0aW9uICAgPSBiYXNlbGluZVsnZ2VuX3Byb2R1Y3Rpb24nXTtcblx0dmFyIGdlbl9lbWlzc2lvbnMgICAgPSBiYXNlbGluZVsnZ2VuX2VtaXNzaW9ucyddO1xuXHR2YXIgZ2VuX2Nvc3QgICAgICAgICA9IGJhc2VsaW5lWydnZW5fY29zdCddO1xuXHR2YXIgZ2VuX2NhcGl0YWxfY29zdCA9IHt9O1xuXG5cdC8vIGFubnVhbCB2ZWhpY2xlIGZsZWV0IGVtaXNzaW9ucyBpbiBLaWxvdG9ucyBvZiBDTzIgRXF1aXZhbGVudFxuXHR2YXIgZmxlZXRfZW1pc3Npb25zID0ge1xuXHRcdCdSb2FkJzogMTI2ODhcblx0fVxuIFxuXHQvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHQvLyBCdXNpbmVzcyBsb2dpY1xuXHQvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHRcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gWzFdIEVsZWN0cmljIGNhcnNcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQvLyBBU1NVTVBUSU9OOiB0aGVyZSBhcmUgZXNzZW50aWFsbHkgMCBlbGVjdHJpYyBjYXJzIGluIHRoZSBjdXJyZW50IGZsZWV0XG5cdHZhciBlbGVjdHJpY19jYXJzID0gaW5wdXRzWydjYXJOdW1iZXInXTtcblx0dmFyIGVsZWN0cmljX3BjdCA9IGVsZWN0cmljX2NhcnMvMTAwO1xuXG5cdGZsZWV0X2VtaXNzaW9uc1snUm9hZCddID0gZmxlZXRfZW1pc3Npb25zWydSb2FkJ10gKiAoMS1lbGVjdHJpY19wY3QpO1xuXG5cdC8vIEFTU1VNUFRJT046IGFueSB1cHRpY2sgaW4gcG93ZXIgZ2VuZXJhdGlvbiByZXF1aXJlZCB0byBtZWV0XG5cdC8vIGVsZWN0cmljIGNhciBkZW1hbmQsIHdpbGwgYmUgbWV0IHByb3BvcnRpb25hbGx5IGJ5IGFsbCBnZW5lcmF0aW9uIHNvdXJjZXNcblx0Ly8gQVNTVU1QVElPTjogdHlwaWNhbCBFViB3aWxsIHVzZSAwLjIga1doIGZvciAxIGttIHRyYXZlbGxlZFxuXHQvLyBhdmVyYWdlIHRyYXZlbCBpcyAxMjAzMiBrbSBwZXIgeWVhclxuXHQvLyBmbGVldCBzaXplIGlzIDMzNDEwMTNcblx0ZXZfcG93ZXJfcmVxdHMgPSAxMjAzMiAqIDAuMiAqIDMzNDEwMTMgKiBlbGVjdHJpY19wY3Q7XG5cdFxuXHQvLyBjb252ZXJ0IGt3aCB0byBnd2hcblx0ZXZfcG93ZXJfcmVxdHMgPSBldl9wb3dlcl9yZXF0cyAvIDEwMDAwMDA7XG5cblx0Ly8gd29yayBvdXQgdG90YWwgY3VycmVudCBnZW5lcmF0aW9uXG5cdHZhciB0b3RhbF9nZW4gPSAwO1xuXHRmb3IgKHZhciBrZXkgaW4gZ2VuX3Byb2R1Y3Rpb24pIHtcblx0XHR0b3RhbF9nZW4gKz0gZ2VuX3Byb2R1Y3Rpb25ba2V5XTtcblx0fVxuXG5cdHZhciBpbmNyZWFzZV9pbl9wb3dlcl9yZXF0cyA9IDEgKyAoZXZfcG93ZXJfcmVxdHMgLyB0b3RhbF9nZW4pO1xuXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFsyXSBTb2xhciBIb3VzZXNcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS1cblx0dmFyIHNvbGFyX2hvdXNlcyA9IGlucHV0c1snc29sYXJOdW1iZXInXTtcblxuXHQvLyBBU1NVTVBUSU9OIC0gZWFjaCBob3VzZWhvbGQgZ2VuZXJhdGVzIDUyNjAgS1doIHBlciB5ZWFyXG5cdHZhciBzb2xhcl9wcm9kdWN0aW9uID0gc29sYXJfaG91c2VzICogNTI2MDtcblx0Ly8gY29udmVydCB0byBHd2hcblx0c29sYXJfcHJvZHVjdGlvbiA9IHNvbGFyX3Byb2R1Y3Rpb24gLyAxMDAwMDAwO1xuXG5cdC8vIHJlZHVjZSBwcm9wb3J0aW9uYWxseSBhbGwgdGhlIG90aGVyIHByb2R1Y3Rpb24gYW5kIGVtaXNzaW9uc1xuXHR2YXIgZGVjcmVhc2VfZHVlX3RvX3NvbGFyID0gc29sYXJfcHJvZHVjdGlvbiAvIHRvdGFsX2dlbjtcblx0aW5jcmVhc2VfaW5fcG93ZXJfcmVxdHMgLT0gZGVjcmVhc2VfZHVlX3RvX3NvbGFyO1xuXG5cdC8vIC0tLS0tLS0tLS1cblx0Ly8gWzNdIFdpbmRcblx0Ly8gLS0tLS0tLS0tLVxuXHQvLy8vdmFyIG5ld193aW5kID0gaW5wdXRzWyd3aW5kTnVtYmVyJ107XG5cdFxuXHQvLyBCYXNlZCBvbjogRWFjaCBuZXcgd2luZCBmYXJtIGlzIDIwMFc7IDcwMiBHV2ggcGVyIGFubnVtO1xuXHQvLyBjYXBpdGFsIGNvc3Qgb2YgJDUyMSwzNDQsOTE4XG5cdFxuXHQvLyBmaXJzdCB0aGUgY2FwaXRhbCBjb3N0LCB0aGF0J3MgZWFzeTpcblx0Ly8vL2dlbl9jYXBpdGFsX2Nvc3RbJ1dpbmQnXSA9IG5ld193aW5kICogNTIxMzQ0OTE4O1xuXG5cdC8vIG5ldyB3aW5kIGNhcGFjaXR5XG5cdC8vLy92YXIgbmV3X3dpbmRfY2FwYWNpdHkgPSBuZXdfd2luZCAqIDcwMjtcblx0Ly8gbmV3IHdpbmQgY2FwYWNpdHkgZ2l2ZXMgdXMgYXNzb2NpYXRlZCBwcm9kdWN0aW9uLCBlbWlzc2lvbnMsIGFuZCBydW5uaW5nIGNvc3RzXG5cblx0LyppZiAobmV3X3dpbmQgPiAwKSB7XG5cdFx0dmFyIG5ld193aW5kX3JhdGlvID0gbmV3X3dpbmRfY2FwYWNpdHkgLyBnZW5fcHJvZHVjdGlvblsnV2luZCddO1xuXHR9XG5cblx0Z2VuX3Byb2R1Y3Rpb25bJ1dpbmQnXSArPSBuZXdfd2luZF9jYXBhY2l0eTsgKi9cblxuXHQvLyBUT0RPOiBmaW5hbGx5IHJlZHVjZSB0aGUgb3RoZXIgKGhvcGVmdWxseSBsZXNzIHBvbGx1dGluZykgZ2VuZXJhdGlvblxuXG5cblx0Ly8gYXBwbHkgdGhlIGZhY3RvciB0byB0aGUgcHJvZHVjdGlvblxuXHRmb3IgKHZhciBrZXkgaW4gZ2VuX3Byb2R1Y3Rpb24pIHtcblx0XHRnZW5fcHJvZHVjdGlvbltrZXldID0gZ2VuX3Byb2R1Y3Rpb25ba2V5XSAqIGluY3JlYXNlX2luX3Bvd2VyX3JlcXRzO1xuXHR9XG5cblx0Ly8gbm93IGFkZCBpbiB0aGUgc29sYXJcblx0Z2VuX3Byb2R1Y3Rpb25bJ1NvbGFyJ10gPSBzb2xhcl9wcm9kdWN0aW9uO1xuXG5cdGZvciAodmFyIGtleSBpbiBnZW5fZW1pc3Npb25zKSB7XG5cdFx0Z2VuX2VtaXNzaW9uc1trZXldID0gZ2VuX2VtaXNzaW9uc1trZXldICogaW5jcmVhc2VfaW5fcG93ZXJfcmVxdHM7XG5cdH1cblxuXHQvLyBub3cgYXBwbHkgdGhhdCBmYWN0b3IgdG8gdGhlIGVtaXNzaW9ucyAtIGVtaXNzaW9ucyBmcm9tIEVWIHBvd2VyIHJlcXVpcmVtZW50c1xuXHRmb3IgKHZhciBrZXkgaW4gZ2VuX2VtaXNzaW9ucykge1xuXHRcdGdlbl9lbWlzc2lvbnNba2V5XSA9IGdlbl9lbWlzc2lvbnNba2V5XSAqIGluY3JlYXNlX2luX3Bvd2VyX3JlcXRzO1xuXHR9XG5cblx0Ly8gYWxzbyBhcHBseSB0aGUgc2FtZSBmYWN0b3IgdG8gdGhlIGdlbmVyYXRpb24gY29zdFxuXHRmb3IgKHZhciBrZXkgaW4gZ2VuX2Nvc3QpIHtcblx0XHRnZW5fY29zdFtrZXldID0gZ2VuX2Nvc3Rba2V5XSAqIGluY3JlYXNlX2luX3Bvd2VyX3JlcXRzO1xuXHR9XG5cblxuXHQvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHQvLyBPdXRwdXRcblx0Ly8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblx0dmFyIHJlc3VsdCA9IHtcblx0XHQnZ2VuX3Byb2R1Y3Rpb24nOiBnZW5fcHJvZHVjdGlvbixcblx0XHQnZ2VuX2VtaXNzaW9ucyc6IGdlbl9lbWlzc2lvbnMsXG5cdFx0J2dlbl9jb3N0JzogZ2VuX2Nvc3QsXG5cdFx0J2dlbl9jYXBpdGFsX2Nvc3QnOiBnZW5fY2FwaXRhbF9jb3N0LFxuXHRcdCdmbGVldF9lbWlzc2lvbnMnOiBmbGVldF9lbWlzc2lvbnNcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59XG5cblxuZnVuY3Rpb24gZ2V0QmFzZWxpbmUoKSB7XG5cblx0Ly8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblx0Ly8gQmFzZWxpbmUgZGF0YSA6IDIwMTMvMjAxNFxuXHQvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5cdC8vIGFubnVhbCBnZW5lcmF0aW9uIGluIEdpZ2F3YXR0IEhvdXJzXG5cdHZhciBnZW5fcHJvZHVjdGlvbiA9IHtcblx0XHQnSHlkcm8nOiAyNDA5NSxcblx0XHQnR2VvdGhlcm1hbCc6IDY0ODcsXG5cdFx0J1dpbmQnOiAyMTg3LFxuXHRcdCdDb2FsJzogMTgzMixcblx0XHQnR2FzJzogNjYyNixcbiAgICAnU29sYXInOiAwXG5cdH1cblxuXHQvLyBhbm51YWwgZ2VuZXJhdGlvbiBlbWlzc2lvbnMgaW4gS2lsb3RvbnMgb2YgQ08yIEVxdWl2YWxlbnRcblx0dmFyIGdlbl9lbWlzc2lvbnMgPSB7XG5cdFx0J0h5ZHJvJzogMCxcblx0XHQnR2VvdGhlcm1hbCc6IDg0Ny4zMixcblx0XHQnV2luZCc6IDAsXG5cdFx0J0NvYWwnOiAxMjIyLjIsXG5cdFx0J0dhcyc6IDM0MDUuNTFcblx0fVxuXG5cdC8vIGFubnVhbCBnZW5lcmF0aW9uIGNvc3RzIGluICROWiBwZXIgeWVhciAoSSB0aGluaylcblx0dmFyIGdlbl9jb3N0ID0ge1xuXHRcdCdIeWRybyc6IDUzODcyMTgwLFxuXHRcdCdHZW90aGVybWFsJzogNTk1MzUwMDAsXG5cdFx0J1dpbmQnOiA0MzQ4NDAwMCxcblx0XHQnQ29hbCc6IDM0MTc3MjAwLFxuXHRcdCdHYXMnOiAxNjEwNDQxOTJcblx0fVxuXG5cdHZhciByZXN1bHQgPSB7XG5cdFx0J2dlbl9wcm9kdWN0aW9uJzogZ2VuX3Byb2R1Y3Rpb24sXG5cdFx0J2dlbl9lbWlzc2lvbnMnOiBnZW5fZW1pc3Npb25zLFxuXHRcdCdnZW5fY29zdCc6IGdlbl9jb3N0LFxuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuXG4iLCIvLyBOQjogdHJhbnNsYXRlZCB0byBhdm9pZCB1c2luZyBKUXVlcnksIHNpbmNlIHdlIGRvbid0IG5lZWQgaXQgZm9yIGFueXRoaW5nIGVsc2VcbmZ1bmN0aW9uIHBvd2VyT2ZmKCkge1xuICBkb2N1bWVudC5ib2R5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2JsYWNrJztcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnbm9uZSc7XG4gIH0sIDMwMDApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9