package com.example.demo;



import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Embeddable;


@Embeddable
public class Meta {
	
	@Column (name = "date")
	private LocalDateTime date;
	
	public Meta() {}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "Meta [date=" + date + "]";
	}
	
	
	
}
