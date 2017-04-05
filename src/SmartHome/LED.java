package SmartHome;

import com.pi4j.io.gpio.*;
import com.pi4j.io.gpio.event.*; 
/**
 * This class represents a LED connected to the Raspberry pi on a given pin (default pin 6).
 * Connect the physical LED to a GND pin and to a GPIO pin.
 * 
 * @author Don Yoo
 * @version 1.0
 * 
 */
public class LED
{
    // The LED is implemented by a Pi4J output pin.
    private GpioPinDigitalOutput ledPin;
    
    //An array which maps the GPIO pin numbers to integers
    private static final Pin[] pinMap = new Pin[] {RaspiPin.GPIO_00, RaspiPin.GPIO_01, RaspiPin.GPIO_02, RaspiPin.GPIO_03, RaspiPin.GPIO_04, 
        RaspiPin.GPIO_05, RaspiPin.GPIO_06, RaspiPin.GPIO_07, RaspiPin.GPIO_08, RaspiPin.GPIO_09, RaspiPin.GPIO_10, 
        RaspiPin.GPIO_11, RaspiPin.GPIO_12, RaspiPin.GPIO_13, RaspiPin.GPIO_14, RaspiPin.GPIO_15, RaspiPin.GPIO_16, 
        RaspiPin.GPIO_17, RaspiPin.GPIO_18, RaspiPin.GPIO_19, RaspiPin.GPIO_20, RaspiPin.GPIO_21, RaspiPin.GPIO_22,
        RaspiPin.GPIO_23, RaspiPin.GPIO_24, RaspiPin.GPIO_25, RaspiPin.GPIO_26, RaspiPin.GPIO_27, RaspiPin.GPIO_28,
        RaspiPin.GPIO_29
        };

    //The default pin, used by the no-parameters constructor.
    private final static int defaultPin = 6;
   
    /**
     * Connect to an LED attached to the default GPIO pin (6).
     * 
     */
    public LED()
    {
        this(defaultPin);
    }
    
    /**
     * Connect to an LED attached to the given pin number.
     * 
     */
    public LED(int pin)
    {
        // Pin allocation is handled by a GpioController. So first we have to get that from the Factory.
        GpioController gpio = GpioFactory.getInstance();
        
        // Now we need to ask the Controller to allocate (provision) the pin for us as a Digital Output pin. 
        // The parameter PinState.LOW means that initially, we want to set this pin to LOW (off).
        ledPin = gpio.provisionDigitalOutputPin(pinMap[pin], PinState.LOW);
    }
    
    /**
     * Turn on the LED.
     * 
     */
    public void on() {
        // Sets the LED pin state to 1 (high)
        ledPin.high();
    }
    
    /**
     * Turn off the LED.
     * 
     */
    public void off() {
        // Sets the LED pin state to (low)
        ledPin.low();
    }
    
    /**
     * Checks if the the LED is on.
     * 
     */
    public boolean isOn()
    {
        // Check the pin state
        return ledPin.isHigh();
    }
}