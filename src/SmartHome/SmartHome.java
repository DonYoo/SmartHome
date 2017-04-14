package SmartHome;

import java.io.IOException;
import java.net.UnknownHostException;


public class SmartHome {


	public static void main(String[] args) throws UnknownHostException, IOException, ClassNotFoundException, InterruptedException {

		System.out.println("Welcome to SmartHome");
		
		// Make a Client object.
		//Controller raspberry1 = new Controller();
		NodeClient client1 = new NodeClient("169.254.63.3", 2000);
 
	    // writes and receives the message
		client1.closeAll();
	}

}
