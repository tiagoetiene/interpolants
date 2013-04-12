var sampling = new function() 
{
    var color_array = [0xC35617,0xF88017,0xFDD017, 0xeeeeee,0xcccccc,0xffffff]
    var color_idx = 0;
    
    this.random = function(a, b, size) {
    	var values = [];
    	var delta = b - a;
    	for(var iii = 0; iii < size; ++iii) {
    		values.push(a + Math.random() * delta);
    	}
    	return values;
    }
    
    this.build_grid = function(gg) {
		g = new Array(4);
		for(var iii = 0; iii < 4; ++iii)
		{
		    g[iii] = new Array(4);
		    for(var jjj = 0; jjj < 4; ++jjj)
		    {
				g[iii][jjj] = new Array(4);
				for(var kkk = 0; kkk < 4; ++kkk)
				{
					g[iii][jjj][kkk] =  gg[iii*16 + jjj*4 + kkk];
				}
		    }
		}
			
		return g;
    }	
    
    
    this.linearize = function(g)
    {
    	var new_grid = [];
	    for(var iii = 0; iii < 4; ++iii)
	    {
	        for(var jjj = 0; jjj < 4; ++jjj)
	        {
	    		for(var kkk = 0; kkk < 4; ++kkk)
	    		{
	    			new_grid.push(g[iii][jjj][kkk]);
	    		}
	        }
	    }
	    return new_grid;
    }

	this.build_particle_system = function(N, sort) {	
		var D = 1.0 / (N-1);
		var material;
		var particles;
		var geometry;
		var colors = [];

		var color_1 = color_array[color_idx]; color_idx = (color_idx+1) % color_array.length; 
		var color_2 = color_array[color_idx]; color_idx = (color_idx+1) % color_array.length;
		var color_3 = color_array[color_idx]; color_idx = (color_idx+1) % color_array.length;

		geometry = new THREE.Geometry()
		for(var jj = 0; jj < N; ++jj)
		{
			geometry.vertices.push(new THREE.Vector3(Math.random(), Math.random(), Math.random()));
			colors.push(new THREE.Color(color_1));
			
			geometry.vertices.push(new THREE.Vector3(Math.random(), Math.random(), Math.random()));
			colors.push(new THREE.Color(color_2));
			
			geometry.vertices.push(new THREE.Vector3(Math.random(), Math.random(), Math.random()));
			colors.push(new THREE.Color(color_3));
		}
			
		material = new THREE.ParticleBasicMaterial({ size: 0.008, vertexColors: true });
		particles = new THREE.ParticleSystem( geometry, material )
		particles.sortParticles = sort;
		geometry.colors = colors;
		
		return particles;
	}


	this.newton = function(p, f) 
	{
		var gradient;
		for(var jj = 0; jj < 9; ++jj) 
		{
			gradient = f.grad(p.x, p.y, p.z);
			gradient.divideScalar(gradient.lengthSq());
			gradient.multiplyScalar(f.f(p.x, p.y, p.z)-f.iso);
			p.subSelf(gradient);
		}
		return p;
	}

	this.sample = function(f, vertices) 
	{
		for(var ii = 0; ii < vertices.length; ++ii)
		{	
			p = this.newton(vertices[ii], f);
			
			if(	p.x >= 0 && p.x <= 1.0 && 
				p.y >= 0 && p.y <= 1.0 &&
				p.z >= 0 && p.z <= 1.0 &&
				Math.abs(f.f(p.x, p.y, p.z)) < 0.05)
			{
				vertices[ii] = p;
			}
			else 
			{
				vertices[ii].z = NaN;
			}
		}
	}
}