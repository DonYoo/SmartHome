package SmartHome;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.Scanner;

public class SmartHome {

	private static Scanner scan;

	public static void main(String[] args) throws UnknownHostException, IOException, ClassNotFoundException {

		System.out.println("Welcome to SmartHome");
		NodeClient client1 = new NodeClient("localhost", 3000);
 
	    // writes and receives the message

		scan = new Scanner(System.in);
		String send_message = "";
		String recv_message = "";
		while(!send_message.equals("bye")){
			send_message = scan.nextLine();
		    client1.send(send_message); 
		}  
	    client1.closeAll();
	}
}
