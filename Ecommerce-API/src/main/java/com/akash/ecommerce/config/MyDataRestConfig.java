package com.akash.ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.akash.ecommerce.entity.Country;
import com.akash.ecommerce.entity.Product;
import com.akash.ecommerce.entity.ProductCategory;
import com.akash.ecommerce.entity.State;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

	private EntityManager entityManager;

	@Autowired
	public MyDataRestConfig(EntityManager theEntityManager) {
		entityManager = theEntityManager;
	}

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);

		HttpMethod[] theUnSupportedActions = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE };

		// disable HTTP methods for Product: PUT, POST and DELETE
		disableHttpMethods(Product.class, config, theUnSupportedActions);

		// disable HTTP methods for ProductCategory: PUT, POST and DELETE
		disableHttpMethods(ProductCategory.class, config, theUnSupportedActions);

//		disable HTTP methods for Country: PUT, POST and DELETE
		disableHttpMethods(Country.class, config, theUnSupportedActions);

//		disable HTTP methods for State: PUT, POST and DELETE
		disableHttpMethods(State.class, config, theUnSupportedActions);

		// call an internal helper method to expose the ID's
		exposeIds(config);
	}

//	disable HTTP methods: PUT, POST and DELETE
	private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config,
			HttpMethod[] theUnSupportedActions) {
		config.getExposureConfiguration().forDomainType(theClass)
				.withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnSupportedActions))
				.withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnSupportedActions));
	}

	// expose entity ID's
	private void exposeIds(RepositoryRestConfiguration config) {

		// get a list of all entity class from the entity manager
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

		// create an array of the entity types
		List<Class> entityClasses = new ArrayList<>();

		// get the entity types for the entities
		for (EntityType<?> entityType : entities) {
			entityClasses.add(entityType.getJavaType());
		}

		// expose the entity ID's for the array of entity/domain types
		Class[] domainTypes = entityClasses.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);
	}
}

// With the help of this class we are making the REST API as read only 