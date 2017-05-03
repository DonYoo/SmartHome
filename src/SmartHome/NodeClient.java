package SmartHome;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Random;
import java.util.Scanner;

public class NodeClient {

	// default node = 1
	private static String ip = "localhost";
	private static int port = 3000; 
	// socket object
	private Socket socket = null; 
	private PrintWriter out;
	private BufferedReader	in;
	private int ClientID = 0;
	private String send_message = "";
	private Controller raspberry;
	
	/**
	 * default construction.<br>
	 * if no input is defined connect to localhost:3000
	 * @throws UnknownHostException
	 * @throws ClassNotFoundException
	 * @throws IOException
	 * @throws InterruptedException 
	 */
	public NodeClient() throws UnknownHostException, IOException, ClassNotFoundException, InterruptedException {
		this(ip, port);
	}
	
	/**
	 * 
	 * @param ipAddress
	 * @param portNumber
	 * @throws UnknownHostException
	 * @throws IOException
	 * @throws ClassNotFoundException
	 * @throws InterruptedException 
	 */
	public NodeClient(String ipAddress, int portNumber)throws UnknownHostException, IOException, ClassNotFoundException, InterruptedException { 
		// construct raspberry
		//raspberry = new Controller();
		
		Random RandomInt = new Random();
		ClientID = RandomInt.nextInt(1000);
		socketConnect(ipAddress, portNumber);
		receive();
	} 
	
	// make the connection with the socket 
	public void socketConnect(String ip, int port) throws UnknownHostException, IOException {
		// Make connection
		socket = new Socket(ip, port);
		System.out.println("[Connecting to socket " + ip + ":" + port + "]");
		
		// in & out initialize streams
		in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
		out = new PrintWriter(socket.getOutputStream(), true);
	}
	
	/**
	 * 
	 * @param message
	 * @throws IOException 
	 */
	// writes the full message int the socket (String) 
	public void send(String message) throws IOException {

		send_message = "From Client "+ClientID+": " + message;
		out.println(send_message);
		out.flush();	// flush data to output
	} 
	
	public void receive() throws IOException, InterruptedException {
		String response = "";
		// get data from server.
		// tell server that inputstream is ready from pi.
		while( !response.contains("SERVER>>> TERMINATE")){
			response = in.readLine();
			System.out.println(response);
			//activate_raspberry(response);
		}       
	}
	
	private void activate_raspberry(String recv_message) {
		if(recv_message.contains("LED")){
			raspberry.buttonChanged(true);
		}
	}

	// get the socket instance 
	public Socket getSocket() {
		return socket; 
	}
	
	// close all stream and socket.
	public void closeAll() throws IOException, InterruptedException{
		Thread.sleep(1000);
		if(out != null){
			out.close();
		}
		if(in != null){
			in.close();
		}
		if(socket != null){
			socket.close();
		}
	}

}
