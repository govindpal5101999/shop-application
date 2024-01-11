package com.example.demo;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Embeddable;


@Embeddable
public class Header {
	
	@Column (name = "reftime")
	private LocalDateTime refTime;

	@Column (name = "parametercategory")
	private Integer parameterCategory;
	
	@Column (name = "parameternumber")
	private Integer parameterNumber;
	
	@Column (name = "forecasttime")
	private Integer forecastTime;

	@Column (name = "nx")
	private Integer nx;
	
	@Column (name = "ny")
	private Integer ny;
	
	@Column (name = "lo1")
	private float lo1;
	
	@Column (name = "la1")
	private float la1;
	
	@Column (name = "lo2")
	private float lo2;
	
	@Column (name = "la2")
	private float la2;
	
	@Column (name = "dx")
	private Integer dx;
	
	@Column (name = "dy")
	private Integer dy;
	
	
	public Header () {}


	public LocalDateTime getRefTime() {
		return refTime;
	}


	public void setRefTime(LocalDateTime refTime) {
		this.refTime = refTime;
	}


	public Integer getParameterCategory() {
		return parameterCategory;
	}


	public void setParameterCategory(Integer parameterCategory) {
		this.parameterCategory = parameterCategory;
	}


	public Integer getParameterNumber() {
		return parameterNumber;
	}


	public void setParameterNumber(Integer parameterNumber) {
		this.parameterNumber = parameterNumber;
	}


	public Integer getForecastTime() {
		return forecastTime;
	}


	public void setForecastTime(Integer forecastTime) {
		this.forecastTime = forecastTime;
	}


	public Integer getNx() {
		return nx;
	}


	public void setNx(Integer nx) {
		this.nx = nx;
	}


	public Integer getNy() {
		return ny;
	}


	public void setNy(Integer ny) {
		this.ny = ny;
	}


	public float getLo1() {
		return lo1;
	}


	public void setLo1(float lo1) {
		this.lo1 = lo1;
	}


	public float getLa1() {
		return la1;
	}


	public void setLa1(float la1) {
		this.la1 = la1;
	}


	public float getLo2() {
		return lo2;
	}


	public void setLo2(float lo2) {
		this.lo2 = lo2;
	}


	public float getLa2() {
		return la2;
	}


	public void setLa2(float la2) {
		this.la2 = la2;
	}


	public Integer getDx() {
		return dx;
	}


	public void setDx(Integer dx) {
		this.dx = dx;
	}


	public Integer getDy() {
		return dy;
	}


	public void setDy(Integer dy) {
		this.dy = dy;
	}


	@Override
	public String toString() {
		return "Header [refTime=" + refTime + ", parameterCategory=" + parameterCategory + ", parameterNumber="
				+ parameterNumber + ", forecastTime=" + forecastTime + ", nx=" + nx + ", ny=" + ny + ", lo1=" + lo1
				+ ", la1=" + la1 + ", lo2=" + lo2 + ", la2=" + la2 + ", dx=" + dx + ", dy=" + dy + "]";
	}

	


	
	
}
