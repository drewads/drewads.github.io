import java.util.Random;

/******************************************************************** 
 * Name: Drew Wadsworth
 * Date: 31 Aug 16
 * Block: G
 * 
 * Program 2: Pseudo-Blackjack
 * Description:
 * 	This program plays pseudo-blackjack 10 times and then displays: 
 * total wins, average points per game, and average cards per game.
 * It does account for Jacks, Queens, and Kings as individual cards 
 * with value 10.  It will also give aces the value 1 or 11,
 * depending on which is better for the player, and will display
 * the corrected value of the ace.
 * 
 ********************************************************************/
public class PseudoBlackjackActualPt2Extra 
{
	static Random gen = new Random();
	public static void main(String[] args) 
	{
		final int AMOUNT_CARDS = 13;	//Number of possible card values to choose
		int numWins = 0;				//Running total of game wins
		int numGames;					//Number of games played
		double numPoints = 0;			//Running total of points acquired in games
		double totalCards = 0;			//Running total of cards drawn

		for (numGames = 0; numGames < 10; numGames++)
		{
			int cardTotal = 0;			//Running total of card values in a game
			int numCards = 0;			//Number of cards drawn in a game
			int[] cardNum = new int[5];	//Array of card values in a game

			System.out.println("Game " + (numGames + 1) + ":");
			
			//This while loop adds cards until the winning or losing condition 
			while (cardTotal < 17 && numCards < 4)
			{
				numCards++;
				
				cardNum[numCards] = gen.nextInt(AMOUNT_CARDS) + 1;

				
				//Correcting face cards to ten and aces to starting value of 11
				if (cardNum[numCards] >= 10)
				{
					cardNum[numCards] = 10;
				}
				else if (cardNum[numCards] == 1)
				{
					cardNum[numCards] = 11;
				}
				
				cardTotal = cardTotal + cardNum[numCards];

				//Changes ace value to 1 if beneficial
				if (cardTotal > 21)
				{
					if (cardNum[1] == 11)
					{
						cardNum[1] = 1;
						cardTotal = cardTotal - 10;
						if (numCards != 1)
						{
							System.out.println("Card 1 is actually 1");
						}
					}
					else if (cardNum[2] == 11)
					{
						cardNum[2] = 1;
						cardTotal = cardTotal - 10;
						if (numCards != 2)
						{
							System.out.println("Card 2 is actually 1");
						}
					}
					else if (cardNum[3] == 11)
					{
						cardNum[3] = 1;
						cardTotal = cardTotal - 10;
						if (numCards != 3)
						{
							System.out.println("Card 3 is actually 1");
						}
					}
					else if (cardNum[4] == 11)
					{
						cardNum[4] = 1;
						cardTotal = cardTotal - 10;
						if (numCards != 4)
						{
							System.out.println("Card 4 is actually: 1");
						}
					}
				}
				
				//Prints single card value
				System.out.println("Card " + numCards + " is: " + cardNum[numCards]);
			}
			
			//Prints single game point total
			System.out.println("Total is: " + cardTotal);

			//Checks for winning or losing conditions and prints
			if (cardTotal == 21 && numCards == 2)
			{
				System.out.println("Blackjack!!! \nGame Won.");
				System.out.println();
				numWins++;
			}
			else if (cardTotal >= 17 && cardTotal <= 21 || 
					(numCards == 4 && cardTotal < 17))
			{
				System.out.println("Game won.");
				System.out.println();
				numWins++;
			}
			else
			{
				System.out.println("Bust.");
				System.out.println();
			}
			
			numPoints = numPoints + cardTotal;
			totalCards = totalCards + numCards;
		}
		
		double avePoints = numPoints / numGames;	//Average points per game
		double aveCards = totalCards / numGames;	//Average cards drawn
		
		//Print data and parameters for the set of games
		System.out.println("Number of wins: " + numWins);
		System.out.println("Average points per game: " + avePoints);
		System.out.println("Average cards per game: " + aveCards);
	}
}