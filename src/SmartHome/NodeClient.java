package SmartHome;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Random;

public class NodeClient {

	// default node = 1
	private static String ip = "localhost";
	private static int port = 3000; 
	// socket object
	private Socket socket = null; 
	private PrintWriter out = null;
	private BufferedReader in = null;
	private int ClientID = 0;
	/**
	 * default construction.<br>
	 * if no input is defined connect to localhost:3000
	 * @throws UnknownHostException
	 * @throws ClassNotFoundException
	 * @throws IOException
	 */
	public NodeClient() throws UnknownHostException, IOException, ClassNotFoundException {
		this(ip, port);
	}
	
	/**
	 * 
	 * @param ipAddress
	 * @param portNumber
	 * @throws UnknownHostException
	 * @throws IOException
	 * @throws ClassNotFoundException
	 */
	public NodeClient(String ipAddress, int portNumber)throws UnknownHostException, IOException, ClassNotFoundException { 
		Random RandomInt = new Random();
		ClientID = RandomInt.nextInt(1000);
		socketConnect(ipAddress, portNumber); 
	} 
	
	// make the connection with the socket 
	public void socketConnect(String ip, int port) throws UnknownHostException, IOException {
		System.out.println("[Connecting to socket " + ip + ":" + port + "]"); 
		socket = new Socket(ip, port); 
	}
	
	/**
	 * 
	 * @param message
	 * @throws IOException 
	 */
	// writes the full message int the socket (String) 
	public void send(String message) throws IOException {
			// out & in 
			out = new PrintWriter(socket.getOutputStream(), true); 
			// writes str in the socket and read 
			String send_message = "From Client "+ClientID+": "+message;
			out.println(send_message);
	} 
	
	public void receive() throws IOException {
		// get data from server.
		in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
		String returnStr = in .readLine();
		System.out.println(returnStr);		
	}
	
	// get the socket instance 
	public Socket getSocket() {
		return socket; 
	}
	
	public void closeAll() throws IOException{
		if(out != null){
			out.close();
		}
		if(socket != null){
			socket.close();
		}
		if(in != null){
			in.close();
		}
	}

}
