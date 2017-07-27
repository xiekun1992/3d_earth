(function(factory){
	if(typeof this.f3dt === "undefined")
		this.f3dt = {};	
	this.f3dt.constantEval = factory();
})(function(){
	return {
		eval_radius: function(moonRadius){
			var EARTH_SCALE = 3.67, MOON_SCALE = 1, MOON_TRACK_RADIUS = 221.18;
			return {
				earth: moonRadius * EARTH_SCALE,
				moon: moonRadius * MOON_SCALE,
				moonTrack: moonRadius * MOON_TRACK_RADIUS
			}
		},
		eval_cycle: function(earthPeriod){
			var EARTH_ROTATION_PERIOD = 1, MOON_ROTATION_PERIOD = 27.32, MOON_REVOLUTION_CYCLE = 27.32;
			return {
				earth: earthPeriod * EARTH_ROTATION_PERIOD,
				moon: earthPeriod * MOON_ROTATION_PERIOD,
				moonRevolution: earthPeriod * MOON_REVOLUTION_CYCLE
			}
		}
	}
});