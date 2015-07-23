package di;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public abstract class InstanceCreator{
   public static Object create(String name){
      ApplicationContext context = new ClassPathXmlApplicationContext("../context.xml");
      Object instance = context.getBean(name);
      return instance;
   }
}
