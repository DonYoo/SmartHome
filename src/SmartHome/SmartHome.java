package SmartHome;

import java.io.IOException;
import java.net.UnknownHostException;


public class SmartHome {


	public static void main(String[] args) throws UnknownHostException, IOException, ClassNotFoundException, InterruptedException {

		System.out.println("Welcome to SmartHome");
		
		// Make a Client object.
		//Controller raspberry1 = new Controller();
		//final NodeClient client1 = new NodeClient("169.254.63.3", 2000);
		final NodeClient client1 = new NodeClient("localhost", 2000);
 
	    // writes and receives the message
		client1.closeAll();
		
		Runtime.getRuntime().addShutdownHook(new Thread() {
			public void run() {
				try {
					client1.closeAll();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		        System.out.println("Running Shutdown Hook");
			}
		});
	}

}
