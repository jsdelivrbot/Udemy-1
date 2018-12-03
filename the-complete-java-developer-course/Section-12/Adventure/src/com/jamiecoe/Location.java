package com.jamiecoe;

import java.util.HashMap;
import java.util.Map;

public class Location {
    private final int locationID;
    private final String description;
    private final Map<String, Integer> exits;

    public Location(int locationID, String description) {
        this.locationID = locationID;
        this.description = description;
        this.exits = new HashMap<>();
    }

    public void addExit(String direction, int locationID) {
        exits.put(direction, locationID);
    }

    public int getLocationID() {
        return locationID;
    }

    public String getDescription() {
        return description;
    }

    public Map<String, Integer> getExits() {
        // Here we are returning a copy of the exits field
        // That way this.exits can only be edited from within this class
        return new HashMap<>(this.exits);
    }
}
