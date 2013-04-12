var trilinear = new function() {

	var s000, s001, s010, s011, s100, s101, s110, s111;	
	var a, b, c, d, e, f, g, h;
	
	this.iso = 0.0;	
	
	this.f = function(x, y, z) {
		return a * x * y * z + b * x * y + c * y * z + d * z * x + e * x + f * y + g * z + h; 
	};

	this.grad = function(x, y, z) {
		return new THREE.Vector3(a*y*z + b * y + d * z + e, a * x * z + b * x + c * z  + f, a * x * y + c * y + d * x  + g);
	};
	
	
	this.critical_point_0 = function() {
			ax = a*e - b*d;
			ay = a*f - b*c;
			az = a*g - c*d;
			
			Disc = -ax*ay*az;
		
			return new THREE.Vector3(-(c/a)+(Math.sqrt(Disc)/(ax*a)), 
								 	 -(d/a)+(Math.sqrt(Disc)/(ay*a)),
								 	 -(b/a)+(Math.sqrt(Disc)/(az*a)));
	}
		
	this.critical_point_1 = function() {
			ax = a*e - b*d;
			ay = a*f - b*c;
			az = a*g - c*d;
			
			Disc = -ax*ay*az;
		
			return new THREE.Vector3(-(c/a)-(Math.sqrt(Disc)/(ax*a)), 
								 -(d/a)-(Math.sqrt(Disc)/(ay*a)),
								 -(b/a)-(Math.sqrt(Disc)/(az*a)));
	}
	
	this.init = function(grid) {
		s000 = grid[1+0][1+0][1+0];
		s001 = grid[1+0][1+0][1+1];
		s010 = grid[1+0][1+1][1+0];
		s011 = grid[1+0][1+1][1+1];
		s100 = grid[1+1][1+0][1+0];
		s101 = grid[1+1][1+0][1+1];
		s110 = grid[1+1][1+1][1+0];
		s111 = grid[1+1][1+1][1+1];
			
		a = s111-s110-s101-s011+s100+s010+s001-s000;
		b = s110-s100-s010+s000;
		c = s011-s010-s001+s000;
		d = s101-s100-s001+s000;
		e = s100-s000;
		f = s010-s000;
		g = s001-s000;
		h = s000;
	}
};
	
