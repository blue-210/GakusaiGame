package di;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public abstract class InstanceCreator{
   public static Object create(String name){
      System.out.println(name);
      ApplicationContext context = new ClassPathXmlApplicationContext("../context.xml");
      System.out.println(name);
      Object instance = context.getBean(name);
      return instance;
   }
}
