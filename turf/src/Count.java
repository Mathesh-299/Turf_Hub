import java.util.Scanner;

public class Count {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        String a = s.nextLine().toLowerCase();
        int con = 0, vowels = 0, spl = 0;
        for (char c : a.toCharArray()) {
            if (c >= 'a' && c <= 'z') {
                if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
                    vowels++;
                } else {
                    con++;
                }
            } else {
                spl++;
            }
        }

        String x = "";
        x += vowels;
        x += con;
        x += spl;
        int value = Integer.valueOf(x);
        int p[] = new int[x.length()];
        int i = 0, count = 0;
        while (value > 0) {
            p[i] = value % 10;
            i++;
            count++;
            value /= 10;
        }
        int b[] = new int[count - 1];
        int k = 0;
        for (i = count - 1; i >= 0; i--) {
            b[k] = p[i];
            k++;
        }
        int g = 0;
        for (int j = 0; j < k - 1; j++) {
            g = 1;
            for (int h = j + 1; h < k; h++) {
                if (b[j] == b[h]) {
                    g++;
                } else {
                    break;
                }
            }
            System.out.println(g + " " + b[j]);
        }
    }
}
